import { select } from '@clack/prompts';

import type { EslintStrictness } from '../../domain/project.options.js';

export async function eslintConfigPrompt(): Promise<EslintStrictness> {
  const strictness = await select({
    options: [
      {
        hint: 'Balanced rules for most projects',
        value: 'recommended',
        label: 'Recommended',
      },
      {
        hint: 'Stricter rules for production-grade code',
        value: 'strict',
        label: 'Strict',
      },
      {
        hint: 'Basic rules, least opinionated',
        value: 'minimal',
        label: 'Minimal',
      },
    ],
    message: 'Select ESLint configuration',
  });

  return strictness as EslintStrictness;
}
