import type { HttpDependencies, HttpConfig } from './http.dependencies';
import type { IInterceptor } from '@shared_kernel/contracts';
import InterceptorManager from './interceptors/interceptor-manager';
import ResponseBuilder from './builders/response/response.builder';
import HeadersBuilder from './builders/headers/headers.builder';
import ErrorHandler from './handlers/error/error.handler';
import UrlBuilder from './builders/url/url.builder';
import Http from './http.client';

export interface CreateHttpOptions<TEndpoints extends Record<string, string>> {
  readonly interceptors?: readonly IInterceptor[];
  readonly config?: Partial<HttpConfig>;
  readonly endpoints: TEndpoints;
}

function createHttpDependencies(interceptors: readonly IInterceptor[]): HttpDependencies {
  return {
    responseBuilder: new ResponseBuilder(),
    headersBuilder: new HeadersBuilder(),
    errorHandler: new ErrorHandler(),
    interceptorManager: new InterceptorManager(interceptors),
    urlBuilder: new UrlBuilder(),
  };
}

export function createHttp<TEndpoints extends Record<string, string>>(
  options: CreateHttpOptions<TEndpoints>
): Http<TEndpoints> {
  return new Http(options.endpoints, createHttpDependencies(options.interceptors ?? []), options.config);
}
