import type { ProjectOptions } from '../../domain/project.options.js';

export interface TemplateVariables {
  dependencyCruiserRules?: string;
  eslintStrictness?: string;
  packageManager: string;
  [key: string]: unknown;
  projectName: string;
  description: string;
  author: string;
  year: number;
}

export function resolveTemplateVariables(options: ProjectOptions, extra?: Record<string, unknown>): TemplateVariables {
  return {
    tanstackQuery: options.stateManagement === 'tanstack-query' || options.stateManagement === 'tanstack-zustand',
    description: `${options.projectName} - Built with Pure Clean Architecture`,
    author: process.env.GIT_AUTHOR_NAME || process.env.USER || 'unknown',
    dependencyCruiserRules: options.dependencyCruiserRules,
    redux: options.stateManagement === 'redux-toolkit',
    eslintStrictness: options.eslintStrictness,
    packageManager: options.packageManager,
    projectName: options.projectName,
    year: new Date().getFullYear(),
    ...extra,
  };
}
