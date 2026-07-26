export interface InternalRequestConfig {
    readonly headers: Record<string, string>;
    readonly isMultipart?: boolean;
    readonly requestBody?: unknown;
    readonly signal: AbortSignal;
    readonly method: string;
}

export const DEFAULT_TIMEOUT = 30_000;

export const DEFAULT_HEADERS: Record<string, string> = {
    'Content-Type': 'application/json',
} as const;
