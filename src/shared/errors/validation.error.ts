import { BaseError } from './base.error.js';

export class ValidationError extends BaseError {
    readonly code = 'VALIDATION_ERROR';
    readonly recoverable = true;
}
