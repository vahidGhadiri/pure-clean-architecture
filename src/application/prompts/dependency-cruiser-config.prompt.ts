import { select } from '@clack/prompts';

import type { DependencyCruiserRules } from '../../domain/project.options.js';

export async function dependencyCruiserConfigPrompt(): Promise<DependencyCruiserRules> {
  const rules = await select({
    options: [
      {
        hint: 'Domain isolation, no circular imports, no spec imports',
        label: 'Minimal',
        value: 'minimal',
      },
      {
        hint: 'All clean architecture layer boundaries enforced (Recommended)',
        label: 'Recommended',
        value: 'recommended',
      },
      {
        hint: 'Layer boundaries + orphans + deprecated + all quality rules',
        label: 'Strict',
        value: 'strict',
      },
    ],
    message: 'Select Dependency Cruiser rule set',
  });

  return rules as DependencyCruiserRules;
}
