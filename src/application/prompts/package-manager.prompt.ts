import { select } from '@clack/prompts';

import type { PackageManager } from '../../domain/project.options.js';

export const packageManagerPrompt = async (): Promise<PackageManager> => {
    const packageManager = await select({
        options: [
            {
                hint: 'recommended',
                value: 'pnpm',
                label: 'pnpm',
            },
            {
                value: 'npm',
                label: 'npm',
            },
            {
                value: 'yarn',
                label: 'yarn',
            },
        ],
        message: 'Which package manager do you want to use?',
    });

    return packageManager as PackageManager;
};
