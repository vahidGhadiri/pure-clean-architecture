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
    'tanstack-zustand': 'TanStack Query + Zustand',
    'tanstack-query': 'TanStack Query',
    'redux-toolkit': 'Redux Toolkit',
    none: 'None',
  };

  return {
    tanstackQuery: options.stateManagement === 'tanstack-query' || options.stateManagement === 'tanstack-zustand',
    description: `${options.projectName} - Built with Pure Clean Architecture`,
    author: process.env.GIT_AUTHOR_NAME || process.env.USER || 'unknown',
    stateManagement: stateManagementLabels[options.stateManagement],
    zustand: options.stateManagement === 'tanstack-zustand',
    dependencyCruiserRules: options.dependencyCruiserRules,
    redux: options.stateManagement === 'redux-toolkit',
    eslintStrictness: options.eslintStrictness,
    packageManager: options.packageManager,
    projectName: options.projectName,
    year: new Date().getFullYear(),
    ...extra,
  };
}
