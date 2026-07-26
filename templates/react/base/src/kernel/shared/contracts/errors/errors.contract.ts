export interface ErrorType {
    readonly fieldErrors?: Record<string, string>;
    readonly severity: 'Business' | 'System';
    readonly message: string;
    readonly code: string;
}
