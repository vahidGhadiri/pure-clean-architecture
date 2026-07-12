import type { ErrorType } from '@shared_kernel/contracts';

import { ErrorSeverity, ErrorCode } from './error.constants';
import { createError } from './error.factory';

export function mapClientError(error: unknown): ErrorType {
    if (error instanceof DOMException && error.name === 'AbortError') {
        return createError({ code: ErrorCode.RequestTimeout, severity: ErrorSeverity.System });
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
        return createError({ code: ErrorCode.ConnectionProblem, severity: ErrorSeverity.System });
    }
    return createError({ code: ErrorCode.GeneralService, severity: ErrorSeverity.System });
}
