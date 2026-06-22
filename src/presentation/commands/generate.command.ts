import { Command } from 'commander';
import path from 'node:path';
import pc from 'picocolors';

import { createCodeGenerator } from '../../application/generators/code/generator.factory.js';
import { FileSystemService } from '../../infrastructure/filesystem/file-system.service.js';

export const createGenerateCommand = () => {
  const command = new Command('generate');

  command
    .description('Generate a clean architecture component')
    .argument('<type>', 'Component type: module, feature, entity, repository, service, usecase')
    .argument('<name>', 'Component name')
    .action(async (type: string, name: string) => {
      try {
        const generator = createCodeGenerator(type);
        const result = await generator.generate({
          targetDirectory: process.cwd(),
          name,
        });

        const fs = new FileSystemService();

        for (const file of result.files) {
          await fs.ensureDirectory(path.dirname(file.path));
          await fs.writeFile(file.path, file.content);
          const relative = path.relative(process.cwd(), file.path);
          console.log(pc.green(`  ✓ Created: ${relative}`));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(pc.red(`  ✗ ${error.message}`));
        } else {
          console.error(pc.red('  ✗ An unexpected error occurred'));
        }
        process.exit(1);
      }
    });

  return command;
};
