import { Command } from 'commander';

import { createInitHandler } from '../../composition/init.composer.js';
import { handleError } from '../../shared/errors/error.handler.js';
import type { CliFlags } from '../../domain/project.options.js';

export const createInitCommand = () => {
  const command = new Command('init');

  command
    .description('Create a new pure clean project')
    .option('-n, --name <name>', 'Project name')
    .option('-p, --path <path>', 'Target directory')
    .option('-m, --manager <manager>', 'Package manager (pnpm, npm, yarn)')
    .option('-t, --tools <tools>', 'Dev tools (comma-separated: eslint, dependency-cruiser)')
    .option('--eslint-strictness <level>', 'ESLint config (recommended, minimal, strict)')
    .option('--dep-cruiser-rules <rules>', 'Dependency Cruiser rules (minimal, recommended, strict)')
    .option('--auth-routing <auth-routing>', 'Auth routing (protected, none)')
    .action(async (flags: CliFlags) => {
      try {
        const handler = createInitHandler();
        await handler.execute(flags);
      } catch (error) {
        handleError(error);
      }
    });

  return command;
};
