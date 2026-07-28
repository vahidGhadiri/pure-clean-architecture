import path from 'node:path';

import type { ProjectOptions } from '../../domain/project.options.js';

interface OverlaySelection {
  condition: boolean;
  name: string;
  path: string;
}

export function resolveOverlays(options: ProjectOptions, templateBasePath: string): OverlaySelection[] {
  const overlaysDir = path.join(templateBasePath, '..', 'overlays');

  return [
    {
      condition: options.authRouting === 'protected',
      path: path.join(overlaysDir, '+auth-routing'),
      name: '+auth-routing',
    },
    {
      condition: options.stateManagement === 'tanstack-query',
      path: path.join(overlaysDir, '+tanstack-query'),
      name: '+tanstack-query',
    },
    {
      condition: options.tools.includes('eslint'),
      path: path.join(overlaysDir, '+eslint'),
      name: '+eslint',
    },
    {
      condition: options.tools.includes('dependency-cruiser'),
      path: path.join(overlaysDir, '+dependency-cruiser'),
      name: '+dependency-cruiser',
    },
  ];
}
