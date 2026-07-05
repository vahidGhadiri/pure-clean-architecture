import { execa } from 'execa';

import type { healthCheck, CheckResult } from '../check.interface.js';

export class GitCheck implements healthCheck {
    readonly description = 'Check git availability';
    readonly name = 'git';

    async run(): Promise<CheckResult> {
        try {
            const { stdout } = await execa('git', ['--version']);
            return {
                message: stdout.trim(),
                name: this.name,
                status: 'pass',
            };
        } catch {
            return {
                suggestion: 'Install git from https://git-scm.com',
                message: 'Git is not installed',
                name: this.name,
                status: 'warn',
            };
        }
    }
}
