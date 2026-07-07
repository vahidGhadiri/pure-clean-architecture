import { execa } from 'execa';

import type { IFileSystemService, ITerminalService } from '../../domain/interfaces.js';
import { DiffEngine } from './diff.engine.js';

interface UpdateServiceDeps {
    fileSystem: IFileSystemService;
    terminal: ITerminalService;
}

export class UpdateService {
    private readonly diffEngine = new DiffEngine();

    constructor(private readonly deps: UpdateServiceDeps) {}

    async updateTemplates(projectPath: string): Promise<void> {
        this.deps.terminal.start('Checking template updates...');

        const manifestPath = `${projectPath}/.pure-clean/manifest.json`;

        if (!(await this.deps.fileSystem.pathExists(manifestPath))) {
            this.deps.terminal.warning('No template manifest found. Skipping template update.');
            return;
        }

        const manifest = (await this.deps.fileSystem.readJson(manifestPath)) as Record<string, unknown>;
        const files = manifest['files'] as
            | Array<{
                  checksum: string;
                  path: string;
              }>
            | undefined;

        if (!files) {
            this.deps.terminal.warning('Invalid manifest format. Skipping template update.');
            return;
        }

        const updated = 0;
        let skipped = 0;

        for (const file of files) {
            const filePath = `${projectPath}/${file.path}`;

            if (!(await this.deps.fileSystem.pathExists(filePath))) {
                continue;
            }

            const currentContent = await this.deps.fileSystem.readFile(filePath);
            const currentChecksum = this.diffEngine.computeChecksum(currentContent);

            if (currentChecksum === file.checksum) {
                continue;
            }

            skipped++;
        }

        this.deps.terminal.succeed(`Template check complete: ${updated} updated, ${skipped} user-modified (skipped)`);
    }

    async updateCLI(): Promise<void> {
        this.deps.terminal.start('Checking for updates...');

        try {
            const { stdout } = await execa('npm', ['view', 'pure-clean-architecture', 'version']);
            const latestVersion = stdout.trim();

            const currentVersion = '0.0.1';

            if (latestVersion === currentVersion) {
                this.deps.terminal.succeed('Already up to date');
                return;
            }

            this.deps.terminal.update(`Updating to version ${latestVersion}...`);

            await execa('npm', ['install', '-g', `pure-clean-architecture@${latestVersion}`]);

            this.deps.terminal.succeed(`Updated to version ${latestVersion}`);
        } catch (error) {
            this.deps.terminal.fail('Failed to check for updates');
            throw error;
        }
    }
}
