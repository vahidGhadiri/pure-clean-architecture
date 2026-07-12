import type { ErrorType } from '@shared_kernel/contracts';

import type { ErrorSeverity, ErrorCode } from './error.constants';
import { ErrorMessages } from './error.constants';

interface CreateErrorParams {
    readonly fieldErrors?: Record<string, string>;
    readonly severity: ErrorSeverity;
    readonly message?: string;
    readonly code: ErrorCode;
}

export function createError({ fieldErrors, severity, message, code }: CreateErrorParams): ErrorType {
    return {
        message: message ?? ErrorMessages[code],
        severity,
        code,
        ...(fieldErrors && { fieldErrors }),
    };
}
