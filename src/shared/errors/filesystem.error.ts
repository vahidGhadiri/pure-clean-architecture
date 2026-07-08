import { BaseError } from './base.error.js';

export class FileSystemError extends BaseError {
    readonly code = 'FILESYSTEM_ERROR';
    readonly recoverable = false;
}
