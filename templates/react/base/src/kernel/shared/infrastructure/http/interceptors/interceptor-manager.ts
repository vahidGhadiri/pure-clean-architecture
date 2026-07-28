import type { IInterceptor, InterceptorRequest, InterceptorResponse } from '@shared_kernel/contracts';

const DEFAULT_PRIORITY = 100;

function sortByPriority(interceptors: readonly IInterceptor[]): IInterceptor[] {
    return [...interceptors].sort(
        (a, b) => (a.priority ?? DEFAULT_PRIORITY) - (b.priority ?? DEFAULT_PRIORITY)
    );
}

export default class InterceptorManager {
    private readonly interceptors: readonly IInterceptor[];

    constructor(interceptors: readonly IInterceptor[] = []) {
        this.interceptors = sortByPriority(interceptors);
    }

    public async runRequest(request: InterceptorRequest): Promise<InterceptorRequest> {
        let current = request;
        for (const interceptor of this.interceptors) {
            if (interceptor.onRequest) {
                current = await interceptor.onRequest(current);
            }
        }
        return current;
    }

    public async runResponse(response: InterceptorResponse): Promise<InterceptorResponse> {
        let current = response;
        for (const interceptor of this.interceptors) {
            if (interceptor.onResponse) {
                current = await interceptor.onResponse(current);
            }
        }
        return current;
    }

    public async runError(error: unknown): Promise<unknown> {
        let current = error;
        for (const interceptor of this.interceptors) {
            if (interceptor.onError) {
                current = await interceptor.onError(current);
            }
        }
        return current;
    }

    public get size(): number {
        return this.interceptors.length;
    }
}
