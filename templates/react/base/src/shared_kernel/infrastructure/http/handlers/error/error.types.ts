import type { ErrorType } from '@shared_kernel/contracts';

export interface IErrorHandler {
    ensureSuccess(response: Response): void;
    handle(error: unknown): ErrorType;
}
