import { select } from '@clack/prompts';

import type { DependencyCruiserRules } from '../../domain/project.options.js';

export async function dependencyCruiserConfigPrompt(): Promise<DependencyCruiserRules> {
  const rules = await select({
    options: [
      {
        hint: 'Only block circular imports (recommended)',
        label: 'No circular dependencies',
        value: 'no-circular',
      },
      {
        hint: 'Enforce clean architecture layer rules',
        label: 'Strict layering',
        value: 'strict',
      },
      {
        hint: 'All rules enabled, maximum enforcement',
        label: 'Full ruleset',
        value: 'full',
      },
    ],
    message: 'Select Dependency Cruiser rule set',
  });

  return rules as DependencyCruiserRules;
}
