import { confirm } from '@clack/prompts';

import type { AuthRouting } from '../../domain/project.options.js';

export async function authRoutingPrompt(): Promise<AuthRouting> {
  const enabled = await confirm({
    message: 'Do you need protected/public route guards?',
    initialValue: false,
  });

  return enabled ? 'protected' : 'none';
}
