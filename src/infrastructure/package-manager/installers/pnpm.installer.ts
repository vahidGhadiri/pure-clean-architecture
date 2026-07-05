import { execa } from 'execa';

import type { IPackageInstaller } from '../../../domain/interfaces.js';
import { InstallError } from '../../../shared/errors/install.error.js';

export class PnpmInstaller implements IPackageInstaller {
    async install(projectPath: string): Promise<void> {
        try {
            await execa('pnpm', ['install'], { cwd: projectPath });
        } catch (error) {
            throw new InstallError('Failed to install dependencies with pnpm', {
                suggestion: 'Ensure pnpm is installed: npm install -g pnpm',
                cause: error instanceof Error ? error : undefined,
            });
        }
    }
}
