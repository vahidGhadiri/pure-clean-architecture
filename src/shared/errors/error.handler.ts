import pc from 'picocolors';

import { ExitCode } from '../../infrastructure/exit-codes.js';
import { BaseError } from './base.error.js';

export function handleError(error: unknown): never {
  if (error instanceof BaseError) {
    console.error(pc.red(`\n${error.name}: ${error.message}`));

    if (error.suggestion) {
      console.error(pc.dim(`  Suggestion: ${error.suggestion}`));
    }

    if (error.recoverable) {
      console.error(pc.dim('  You can fix this and try again.'));
    }

    const exitCode = mapErrorToExitCode(error);
    process.exit(exitCode);
  }

  if (error instanceof Error && error.message === 'Project creation cancelled') {
    console.error(pc.yellow('\nProject creation cancelled.'));
    process.exit(ExitCode.USER_CANCELLED);
  }

  console.error(pc.red('\nAn unexpected error occurred:'));

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }

  process.exit(ExitCode.GENERAL);
}

function mapErrorToExitCode(error: BaseError): number {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      return ExitCode.USER_CANCELLED;
    case 'CONFIG_ERROR':
      return ExitCode.CONFIG_ERROR;
    default:
      return ExitCode.GENERAL;
  }
}
