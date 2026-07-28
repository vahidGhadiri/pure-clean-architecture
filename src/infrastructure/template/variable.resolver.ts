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
  const stateManagementLabels: Record<string, string> = {
    'tanstack-query': 'TanStack Query',
  };

  return {
    description: `${options.projectName} - Built with Pure Clean Architecture`,
    author: process.env.GIT_AUTHOR_NAME || process.env.USER || 'unknown',
    stateManagement: stateManagementLabels[options.stateManagement],
    tanstackQuery: options.stateManagement === 'tanstack-query',
    authRouting: options.authRouting === 'protected',
    dependencyCruiserRules: options.dependencyCruiserRules,
    eslintStrictness: options.eslintStrictness,
    packageManager: options.packageManager,
    projectName: options.projectName,
    year: new Date().getFullYear(),
    ...extra,
  };
}
