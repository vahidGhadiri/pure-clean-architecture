import type { Command } from 'commander';

import type { TemplateDefinition } from '../../domain/template.types.js';
import type { DependencySet } from '../../domain/dependency.types.js';
import type { ProjectOptions } from '../../domain/project.options.js';

export interface PluginTemplateContributor {
    resolveTemplate(options: ProjectOptions): TemplateDefinition | null;
}

export interface PluginDependencyContributor {
    resolveDependencies(options: ProjectOptions): DependencySet | null;
}

export interface PluginTransformerContributor {
    getTransformers(): Array<{
        transform: (projectPath: string, options: ProjectOptions) => Promise<void>;
        name: string;
    }>;
}

export interface PluginCommandContributor {
    getCommands(): Command[];
}

export interface Plugin {
    transformers?: PluginTransformerContributor;
    dependencies?: PluginDependencyContributor;
    templates?: PluginTemplateContributor;
    commands?: PluginCommandContributor;
    version: string;
    name: string;
}
