import type { ErrorType } from '@shared_kernel/contracts';

export type ResponseResult<T> =
    | {
          readonly error: ErrorType;
          readonly success: false;
          readonly data: null;
      }
    | {
          readonly success: true;
          readonly error: null;
          readonly data: T;
      };

export interface IResponseBuilder {
    build<T>(payload: unknown): ResponseResult<T>;
}
