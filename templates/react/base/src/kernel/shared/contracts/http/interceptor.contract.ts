export interface InterceptorRequest {
    readonly method: string;
    readonly url: string;
    readonly body?: unknown;
    readonly headers: Record<string, string>;
    readonly signal: AbortSignal;
}

export interface InterceptorResponse {
    readonly status: number;
    readonly body: unknown;
    readonly headers: Headers;
}

export interface IInterceptor {
    readonly priority?: number;
    onRequest?(request: InterceptorRequest): InterceptorRequest | Promise<InterceptorRequest>;
    onResponse?(response: InterceptorResponse): InterceptorResponse | Promise<InterceptorResponse>;
    onError?(error: unknown): unknown | Promise<unknown>;
}
