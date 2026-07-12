import type { HttpOptions, HttpMethod, IHttp } from '@shared_kernel/contracts';

import type { HttpDependencies, HttpConfig } from './http.dependencies';
import { DEFAULT_TIMEOUT, DEFAULT_HEADERS } from './http.types';
import type { InternalRequestConfig } from './http.types';

export default class Http<TEndpoints extends Record<string, string>> implements IHttp<TEndpoints> {
    private readonly config: HttpConfig;

    constructor(
        private readonly endpoints: TEndpoints,
        private readonly dependencies: HttpDependencies,
        config?: Partial<HttpConfig>
    ) {
        this.config = {
            defaultHeaders: { ...DEFAULT_HEADERS },
            timeout: DEFAULT_TIMEOUT,
            responseType: 'json',
            cache: 'no-cache',
            baseUrl: '',
            ...config,
        };
    }

    public async request<EndpointName extends keyof TEndpoints & string, TResponse = unknown>(
        params: {
            readonly pathParams?: Record<string, string | number>;
            readonly query?: Record<string, unknown> | string;
            readonly endpoint: EndpointName;
            readonly method: HttpMethod;
            readonly body?: unknown;
        },
        options: Partial<HttpOptions> = {}
    ): Promise<TResponse> {
        const { responseBuilder, headersBuilder, errorHandler, urlBuilder } = this.dependencies;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout ?? this.config.timeout);

        try {
            const url = urlBuilder.build({
                serviceEndpoint: this.endpoints[params.endpoint],
                baseUrl: options.baseUrl ?? this.config.baseUrl,
                pathParams: params.pathParams,
                query: params.query,
            });

            const headers = headersBuilder.reset().merge(this.config.defaultHeaders).merge(options.headers).build();

            const requestConfig = this.buildRequestConfig({
                isMultipart: options.isMultipart,
                signal: controller.signal,
                requestBody: params.body,
                method: params.method,
                headers,
            });

            const response = await fetch(url, requestConfig);
            errorHandler.ensureSuccess(response);

            const body = await this.parseResponse(response, options.responseType ?? this.config.responseType);

            const result = responseBuilder.build<TResponse>(body);
            if (!result.success) {
                throw result.error;
            }

            return result.data as TResponse;
        } catch (error) {
            throw errorHandler.handle(error);
        } finally {
            clearTimeout(timeoutId);
        }
    }

    private buildRequestConfig(config: InternalRequestConfig): RequestInit {
        const { requestBody, isMultipart, headers, method, signal } = config;

        const requestInit: RequestInit = { headers, method, signal };
        const shouldHaveBody = requestBody && ['PATCH', 'POST', 'PUT'].includes(method);

        if (!shouldHaveBody) return requestInit;

        if (isMultipart) {
            requestInit.body = this.toFormData(requestBody);
        } else {
            requestInit.body = JSON.stringify(requestBody);
        }

        return requestInit;
    }

    private async parseResponse(response: Response, responseType: string): Promise<unknown> {
        switch (responseType) {
            case 'arrayBuffer':
                return response.arrayBuffer();
            case 'text':
                return response.text();
            case 'blob':
                return response.blob();
            default:
                return this.parseJsonBody(response);
        }
    }

    private toFormData(body: unknown): FormData {
        if (body instanceof FormData) return body;
        const formData = new FormData();
        for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
            formData.append(key, value instanceof Blob ? value : String(value));
        }
        return formData;
    }

    private async parseJsonBody(response: Response): Promise<unknown> {
        const text = await response.text();
        if (!text.trim()) return null;
        return JSON.parse(text);
    }
}
