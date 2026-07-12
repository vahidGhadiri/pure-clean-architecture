import type { HttpDependencies, HttpConfig } from './http.dependencies';
import ResponseBuilder from './builders/response/response.builder';
import HeadersBuilder from './builders/headers/headers.builder';
import ErrorHandler from './handlers/error/error.handler';
import UrlBuilder from './builders/url/url.builder';
import Http from './http.client';

function createHttpDependencies(): HttpDependencies {
    return {
        responseBuilder: new ResponseBuilder(),
        headersBuilder: new HeadersBuilder(),
        errorHandler: new ErrorHandler(),
        urlBuilder: new UrlBuilder(),
    };
}

export function createHttp<TEndpoints extends Record<string, string>>(
    endpoints: TEndpoints,
    config?: Partial<HttpConfig>
): Http<TEndpoints> {
    return new Http(endpoints, createHttpDependencies(), config);
}
