import { Command } from 'commander';

import { createGenerateCommand } from './presentation/commands/generate.command.js';
import { createhealthCommand } from './presentation/commands/health.command.js';
import { createUpdateCommand } from './presentation/commands/update.command.js';
import { getPluginConfigs } from './infrastructure/plugins/plugin.config.js';
import { createInitCommand } from './presentation/commands/init.command.js';
import { PluginManager } from './infrastructure/plugins/plugin-manager.js';
import { PluginLoader } from './infrastructure/plugins/plugin.loader.js';
import { handleError } from './shared/errors/error.handler.js';

const program = new Command();

program.name('pure-clean').description('Pure Clean Architecture CLI').version('0.0.1');

const pluginLoader = new PluginLoader();
const pluginConfigs = getPluginConfigs();
const plugins = await pluginLoader.loadPlugins(pluginConfigs);
const pluginManager = new PluginManager(plugins);

program.addCommand(createInitCommand());
program.addCommand(createGenerateCommand());
program.addCommand(createUpdateCommand());
program.addCommand(createhealthCommand());

for (const command of pluginManager.getCommands()) {
    program.addCommand(command);
}

try {
    await program.parseAsync();
} catch (error) {
    handleError(error);
}
