import { select } from '@clack/prompts';

import type { StateManagement } from '../../domain/project.options.js';

export async function stateManagementPrompt(): Promise<StateManagement> {
  const stateManagement = await select({
    options: [
      {
        label: 'TanStack Query + Zustand',
        value: 'tanstack-zustand',
        hint: 'recommended',
      },
      {
        label: 'TanStack Query only',
        value: 'tanstack-query',
      },
      {
        value: 'redux-toolkit',
        label: 'Redux Toolkit',
      },
      {
        value: 'none',
        label: 'None',
      },
    ],
    message: 'Select state management solution',
  });

  return stateManagement as StateManagement;
}
