import type { IPackageInstaller, ITerminalService } from '../../domain/interfaces.js';
import { InstallError } from '../../shared/errors/install.error.js';

export class InstallerService {
    constructor(
        private readonly installer: IPackageInstaller,
        private readonly terminal: ITerminalService
    ) {}

    async installDependencies(projectPath: string): Promise<void> {
        this.terminal.start('Installing dependencies...');

        try {
            await this.installer.install(projectPath);
            this.terminal.succeed('Dependencies installed');
        } catch (error) {
            this.terminal.fail('Failed to install dependencies');

            if (error instanceof InstallError) {
                throw error;
            }

            throw new InstallError('Unexpected error during installation', {
                cause: error instanceof Error ? error : undefined,
            });
        }
    }
}
