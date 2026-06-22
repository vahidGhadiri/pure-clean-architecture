import { BaseError } from './base.error.js';

export class InstallError extends BaseError {
  readonly code = 'INSTALL_ERROR';
  readonly recoverable = true;
}
