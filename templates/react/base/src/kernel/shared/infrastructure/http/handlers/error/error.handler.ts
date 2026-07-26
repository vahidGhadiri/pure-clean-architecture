import type { ErrorType } from '@shared_kernel/contracts';

import { ErrorSeverity, ErrorCode } from './error.constants';
import type { IErrorHandler } from './error.types';
import { mapClientError } from './error.mapper';
import { createError } from './error.factory';

export default class ErrorHandler implements IErrorHandler {
    public ensureSuccess(response: Response): void {
        if (response.ok) return;

        const code = this.mapHttpStatusToErrorCode(response.status);
        const severity = response.status === 401 ? ErrorSeverity.Business : ErrorSeverity.System;

        throw createError({
            message: `HTTP ${response.status}: ${response.statusText}`,
            severity,
            code,
        });
    }

    public handle(error: unknown): ErrorType {
        if (this.isErrorType(error)) return error;
        return mapClientError(error);
    }

    private isErrorType(error: unknown): error is ErrorType {
        if (typeof error !== 'object' || error === null) return false;
        const record = error as Record<string, unknown>;
        return (
            typeof record.message === 'string' &&
            typeof record.code === 'string' &&
            (record.severity === 'System' || record.severity === 'Business')
        );
    }

    private mapHttpStatusToErrorCode(status: number): ErrorCode {
        if (status === 401 || status === 403) return ErrorCode.Unauthorized;
        if (status >= 500) return ErrorCode.GeneralService;
        return ErrorCode.GeneralService;
    }
}
