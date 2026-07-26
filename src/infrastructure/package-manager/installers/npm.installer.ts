import { execa } from 'execa';

import type { IPackageInstaller } from '../../../domain/interfaces.js';
import { InstallError } from '../../../shared/errors/install.error.js';

export class NpmInstaller implements IPackageInstaller {
  async install(projectPath: string): Promise<void> {
    try {
      const result = await execa('npm', ['install'], {
        cwd: projectPath,
        reject: false,
      });

      if (result.exitCode !== 0) {
        throw new Error(result.stderr || result.stdout || `npm exited with code ${result.exitCode}`);
      }
    } catch (error) {
      throw new InstallError('Failed to install dependencies with npm', {
        suggestion: `Run "cd ${projectPath} && npm install" manually to see the error`,
        cause: error instanceof Error ? error : undefined,
      });
    }
  }
}
