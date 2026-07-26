export type HttpMethod = 'DELETE' | 'PATCH' | 'POST' | 'GET' | 'PUT';

export interface RequestConfig {
    readonly responseType?: 'arrayBuffer' | 'json' | 'text' | 'blob';
    readonly params?: Record<string, string | number>;
    readonly headers?: Record<string, string>;
    readonly timeout?: number;
}

export interface IHttp<TEndpoints extends Record<string, string>> {
    request<EndpointName extends keyof TEndpoints & string, TResponse = unknown>(
        params: {
            readonly pathParams?: Record<string, string | number>;
            readonly query?: Record<string, unknown> | string;
            readonly endpoint: EndpointName;
            readonly method: HttpMethod;
            readonly body?: unknown;
        },
        options?: Partial<HttpOptions>
    ): Promise<TResponse>;
}

export interface HttpOptions {
    readonly responseType?: 'arrayBuffer' | 'json' | 'text' | 'blob';
    readonly headers?: Record<string, string>;
    readonly isMultipart?: boolean;
    readonly cache?: RequestCache;
    readonly baseUrl?: string;
    readonly timeout?: number;
}
