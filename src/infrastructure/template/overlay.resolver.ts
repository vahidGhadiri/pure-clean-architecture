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
      condition: options.stateManagement === 'tanstack-query' || options.stateManagement === 'tanstack-zustand',
      path: path.join(overlaysDir, '+tanstack-query'),
      name: '+tanstack-query',
    },
    {
      condition: options.stateManagement === 'tanstack-zustand',
      path: path.join(overlaysDir, '+zustand'),
      name: '+zustand',
    },
    {
      condition: options.stateManagement === 'redux-toolkit',
      path: path.join(overlaysDir, '+redux'),
      name: '+redux',
    },
    {
      condition: options.stateManagement === 'none',
      path: path.join(overlaysDir, '+none'),
      name: '+none',
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
