import pc from 'picocolors';

import type { healthContext, healthCheck, CheckResult } from './check.interface.js';
import type { ITerminalService } from '../../domain/interfaces.js';

export class healthService {
  private readonly checks: healthCheck[];

  constructor(
    checks: healthCheck[],
    private readonly terminal: ITerminalService
  ) {
    this.checks = checks;
  }

  async runAll(context: healthContext): Promise<CheckResult[]> {
    const results: CheckResult[] = [];

    this.terminal.blank();
    this.terminal.info('Pure Clean Architecture - health');
    this.terminal.blank();

    for (const check of this.checks) {
      this.terminal.step(results.length + 1, this.checks.length, check.description);

      try {
        const result = await check.run(context);
        results.push(result);

        const icon = this.getStatusIcon(result.status);
        this.terminal.info(`${icon} ${result.message}`);

        if (result.suggestion) {
          this.terminal.info(`  → ${result.suggestion}`);
        }
      } catch (error) {
        results.push({
          message: `Check failed: ${error instanceof Error ? error.message : String(error)}`,
          name: check.name,
          status: 'fail',
        });
      }
    }

    this.printSummary(results);
    return results;
  }

  private printSummary(results: CheckResult[]): void {
    const passed = results.filter((r) => r.status === 'pass').length;
    const warned = results.filter((r) => r.status === 'warn').length;
    const failed = results.filter((r) => r.status === 'fail').length;

    this.terminal.blank();
    this.terminal.info(
      `Results: ${pc.green(`${passed} passed`)} ${pc.yellow(`${warned} warnings`)} ${pc.red(`${failed} failed`)}`
    );
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'pass':
        return pc.green('✓');
      case 'warn':
        return pc.yellow('⚠');
      case 'fail':
        return pc.red('✗');
      case 'skip':
        return pc.dim('○');
      default:
        return '?';
    }
  }
}
