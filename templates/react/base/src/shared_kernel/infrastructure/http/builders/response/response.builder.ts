import type { ErrorType } from '@shared_kernel/contracts';

import type { IResponseBuilder, ResponseResult } from './response.types';

export default class ResponseBuilder implements IResponseBuilder {
    public build<T>(payload: unknown): ResponseResult<T> {
        if (this.isErrorPayload(payload)) {
            return { success: false, error: payload, data: null };
        }
        return { data: payload as T, success: true, error: null };
    }

    private isErrorPayload(payload: unknown): payload is ErrorType {
        if (typeof payload !== 'object' || payload === null) return false;
        const record = payload as Record<string, unknown>;
        return (
            typeof record.message === 'string' &&
            typeof record.code === 'string' &&
            (record.severity === 'System' || record.severity === 'Business')
        );
    }
}
