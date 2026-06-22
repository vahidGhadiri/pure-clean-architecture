import type { Command } from 'commander';

import type { TemplateDefinition } from '../../domain/template.types.js';
import type { DependencySet } from '../../domain/dependency.types.js';
import type { ProjectOptions } from '../../domain/project.options.js';
import type { Plugin } from './plugin.interface.js';

export class PluginManager {
  private readonly plugins: Plugin[];

  constructor(plugins: Plugin[]) {
    this.plugins = plugins;
  }

  resolveDependencies(options: ProjectOptions, base: DependencySet): DependencySet {
    let merged = { ...base };

    for (const plugin of this.plugins) {
      if (plugin.dependencies) {
        const result = plugin.dependencies.resolveDependencies(options);
        if (result) {
          merged = {
            devDependencies: { ...merged.devDependencies, ...result.devDependencies },
            dependencies: { ...merged.dependencies, ...result.dependencies },
          };
        }
      }
    }

    return merged;
  }

  resolveTemplate(options: ProjectOptions, fallback: TemplateDefinition): TemplateDefinition {
    for (const plugin of this.plugins) {
      if (plugin.templates) {
        const result = plugin.templates.resolveTemplate(options);
        if (result) return result;
      }
    }
    return fallback;
  }

  getCommands(): Command[] {
    const commands: Command[] = [];

    for (const plugin of this.plugins) {
      if (plugin.commands) {
        commands.push(...plugin.commands.getCommands());
      }
    }

    return commands;
  }
}
