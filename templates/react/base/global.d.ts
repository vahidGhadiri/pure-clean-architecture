/// <reference types="vite/client" />

export {};

declare global {
    type ErrorCode =
        | 'INSUFFICIENT_BALANCE'
        | 'ConnectionProblem'
        | 'VALIDATION_ERROR'
        | 'RequestTimeout'
        | 'GeneralService'
        | 'NETWORK_ERROR'
        | 'Unauthorized'
        | 'NOT_FOUND'
        | 'UNKNOWN';

    type ErrorSeverity = 'Business' | 'System';

    interface ErrorType {
        readonly fieldErrors?: Record<string, string>;
        readonly severity: ErrorSeverity;
        readonly message: string;
        readonly code: ErrorCode;
    }
}
