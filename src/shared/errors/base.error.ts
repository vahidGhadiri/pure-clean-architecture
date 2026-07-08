export abstract class BaseError extends Error {
    abstract readonly recoverable: boolean;
    abstract readonly code: string;

    readonly suggestion?: string;

    constructor(
        message: string,
        options?: {
            suggestion?: string;
            cause?: Error;
        }
    ) {
        super(message);
        this.name = this.constructor.name;
        this.suggestion = options?.suggestion;
        if (options?.cause) {
            this.cause = options.cause;
        }
    }
}
