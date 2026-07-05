import { execa } from 'execa';

import type { IPackageInstaller } from '../../../domain/interfaces.js';
import { InstallError } from '../../../shared/errors/install.error.js';

export class YarnInstaller implements IPackageInstaller {
    async install(projectPath: string): Promise<void> {
        try {
            await execa('yarn', ['install'], { cwd: projectPath });
        } catch (error) {
            throw new InstallError('Failed to install dependencies with yarn', {
                suggestion: 'Ensure yarn is installed: npm install -g yarn',
                cause: error instanceof Error ? error : undefined,
            });
        }
    }
}
