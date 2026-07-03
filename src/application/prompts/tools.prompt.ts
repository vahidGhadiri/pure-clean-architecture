import { multiselect } from '@clack/prompts';

import type { DevelopmentTool } from '../../domain/project.options.js';

export async function toolsPrompt(): Promise<DevelopmentTool[]> {
    const selectedTools = await multiselect({
        options: [
            {
                value: 'eslint',
                label: 'ESLint',
            },
            {
                value: 'dependency-cruiser',
                label: 'Dependency Cruiser',
            },
        ],

        message: 'Select development tools',

        initialValues: ['eslint'],
    });

    return selectedTools as DevelopmentTool[];
}
