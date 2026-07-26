import { execa } from 'execa';

import type { IPackageInstaller } from '../../../domain/interfaces.js';
import { InstallError } from '../../../shared/errors/install.error.js';

export class PnpmInstaller implements IPackageInstaller {
  async install(projectPath: string): Promise<void> {
    try {
      const result = await execa('pnpm', ['install'], {
        cwd: projectPath,
        reject: false,
      });

      const isIgnoredBuildsWarning = result.exitCode === 1 && result.stdout.includes('ERR_PNPM_IGNORED_BUILDS');

      if (result.exitCode !== 0 && !isIgnoredBuildsWarning) {
        throw new Error(result.stderr || result.stdout || `pnpm exited with code ${result.exitCode}`);
      }
    } catch (error) {
      throw new InstallError('Failed to install dependencies with pnpm', {
        suggestion: `Run "cd ${projectPath} && pnpm install" manually to see the error`,
        cause: error instanceof Error ? error : undefined,
      });
    }
  }
}
