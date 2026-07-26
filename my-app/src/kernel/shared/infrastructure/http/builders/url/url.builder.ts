import type { BuildUrlParams, IUrlBuilder } from './url.types';

const REMOVE_SURPLUS_SLASHES_REGEX = /^\/+|\/+$/g;

export default class UrlBuilder implements IUrlBuilder {
    public build({ serviceEndpoint, pathParams, baseUrl, query }: BuildUrlParams): string {
        if (!serviceEndpoint?.trim()) {
            throw new Error('Service endpoint cannot be empty');
        }
        if (!baseUrl?.trim()) {
            throw new Error('Base URL cannot be empty');
        }

        const path = this.replacePathParams(serviceEndpoint, pathParams);
        const queryString = this.buildQueryString(query);

        return this.toAbsoluteUrl(`${this.buildPath(baseUrl, path)}${queryString}`);
    }

    public toAbsoluteUrl(path: string, baseOrigin = this.getCurrentOrigin()): string {
        try {
            return new URL(path).toString();
        } catch {
            return new URL(path, baseOrigin).toString();
        }
    }

    public buildPath(...parts: string[]): string {
        return parts
            .map((part) => part?.trim().replace(REMOVE_SURPLUS_SLASHES_REGEX, ''))
            .filter(Boolean)
            .join('/');
    }

    private buildQueryString(query?: Record<string, unknown> | string): string {
        if (!query) return '';
        if (typeof query === 'string') {
            return query.trim() ? `?${query}` : '';
        }

        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
            if (Array.isArray(value)) {
                for (const item of value) {
                    params.append(key, String(item));
                }
                continue;
            }
            params.set(key, String(value));
        }
        const result = params.toString();
        return result ? `?${result}` : '';
    }

    private replacePathParams(endpoint: string, params?: Record<string, string | number>): string {
        if (!params) return endpoint;
        let result = endpoint;
        for (const [key, value] of Object.entries(params)) {
            result = result.replace(`:${key}`, encodeURIComponent(String(value)));
        }
        return result;
    }

    private getCurrentOrigin(): string {
        if (typeof globalThis.location?.origin === 'string') {
            return globalThis.location.origin;
        }
        return 'http://localhost';
    }
}
