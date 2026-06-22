import type { healthCheck, CheckResult } from '../check.interface.js';

export class NodeVersionCheck implements healthCheck {
  readonly description = 'Check Node.js version';
  readonly name = 'node-version';

  async run(): Promise<CheckResult> {
    const version = process.version;
    const major = parseInt(version.slice(1), 10);

    if (major >= 18) {
      return {
        message: `Node.js ${version}`,
        name: this.name,
        status: 'pass',
      };
    }

    return {
      message: `Node.js ${version} is below minimum (18+)`,
      suggestion: 'Upgrade Node.js to version 18 or later',
      name: this.name,
      status: 'fail',
    };
  }
}
