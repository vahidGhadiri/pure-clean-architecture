import { execa } from 'execa';

import type { IPackageInstaller } from '../../../domain/interfaces.js';
import { InstallError } from '../../../shared/errors/install.error.js';

export class NpmInstaller implements IPackageInstaller {
    async install(projectPath: string): Promise<void> {
        try {
            await execa('npm', ['install'], { cwd: projectPath });
        } catch (error) {
            throw new InstallError('Failed to install dependencies with npm', {
                cause: error instanceof Error ? error : undefined,
                suggestion: 'Ensure npm is installed',
            });
        }
    }
}
