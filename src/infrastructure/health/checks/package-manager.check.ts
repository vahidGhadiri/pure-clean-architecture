import { execa } from 'execa';

import type { healthCheck, CheckResult } from '../check.interface.js';

export class PackageManagerCheck implements healthCheck {
  readonly description = 'Check package manager availability';
  readonly name = 'package-manager';

  async run(): Promise<CheckResult> {
    const managers = ['pnpm', 'npm', 'yarn'];
    const available: string[] = [];

    for (const pm of managers) {
      try {
        await execa(pm, ['--version']);
        available.push(pm);
      } catch {
        // not installed
      }
    }

    if (available.includes('pnpm')) {
      return {
        message: `Available: ${available.join(', ')}`,
        name: this.name,
        status: 'pass',
      };
    }

    return {
      message: `Available: ${available.join(', ') || 'none'}`,
      suggestion: 'Install pnpm: npm install -g pnpm',
      name: this.name,
      status: 'warn',
    };
  }
}
