import type { IResponseBuilder } from './builders/response/response.types';
import type { IHeadersBuilder } from './builders/headers/headers.types';
import type { IErrorHandler } from './handlers/error/error.types';
import type { IUrlBuilder } from './builders/url/url.types';

export interface HttpDependencies {
    readonly responseBuilder: IResponseBuilder;
    readonly headersBuilder: IHeadersBuilder;
    readonly errorHandler: IErrorHandler;
    readonly urlBuilder: IUrlBuilder;
}

export interface HttpConfig {
    readonly responseType: 'arrayBuffer' | 'json' | 'text' | 'blob';
    readonly defaultHeaders: Record<string, string>;
    readonly cache: RequestCache;
    readonly baseUrl: string;
    readonly timeout: number;
}
