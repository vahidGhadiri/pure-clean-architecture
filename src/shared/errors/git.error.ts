import { BaseError } from './base.error.js';

export class GitError extends BaseError {
  readonly code = 'GIT_ERROR';
  readonly recoverable = true;
}
