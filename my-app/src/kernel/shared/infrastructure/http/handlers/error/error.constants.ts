export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type ErrorSeverity = (typeof ErrorSeverity)[keyof typeof ErrorSeverity];

export const ErrorCode = {
    ConnectionProblem: 'ConnectionProblem',
    RequestTimeout: 'RequestTimeout',
    GeneralService: 'GeneralService',
    Unauthorized: 'Unauthorized',
} as const;

export const ErrorSeverity = {
    Business: 'Business',
    System: 'System',
} as const;

export const ErrorMessages: Record<ErrorCode, string> = {
    [ErrorCode.ConnectionProblem]: 'A connection problem occurred. Please check your network.',
    [ErrorCode.RequestTimeout]: 'Request timed out. The server did not respond in time.',
    [ErrorCode.GeneralService]: 'An unexpected error occurred. Please try again later.',
    [ErrorCode.Unauthorized]: 'Your session has expired. Please log in again.',
};
