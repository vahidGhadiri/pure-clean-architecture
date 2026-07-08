import { BaseError } from './base.error.js';

export class TemplateError extends BaseError {
    readonly code = 'TEMPLATE_ERROR';
    readonly recoverable = false;
}
