import { Command } from 'commander';

import { FileSystemService } from '../../infrastructure/filesystem/file-system.service.js';
import { TerminalService } from '../../infrastructure/terminal/terminal.service.js';
import { UpdateService } from '../../infrastructure/update/update.service.js';
import { handleError } from '../../shared/errors/error.handler.js';

export const createUpdateCommand = () => {
    const command = new Command('update');

    command
        .description('Update the pure-clean CLI and templates')
        .option('--templates-only', 'Only update templates')
        .option('--cli-only', 'Only update the CLI')
        .action(async (options) => {
            try {
                const fileSystem = new FileSystemService();
                const terminal = new TerminalService();
                const updateService = new UpdateService({ fileSystem, terminal });

                if (options.cliOnly) {
                    await updateService.updateCLI();
                } else if (options.templatesOnly) {
                    await updateService.updateTemplates(process.cwd());
                } else {
                    await updateService.updateCLI();
                    await updateService.updateTemplates(process.cwd());
                }
            } catch (error) {
                handleError(error);
            }
        });

    return command;
};
