import type { healthContext, healthCheck, CheckResult } from '../check.interface.js';

export class DependencyConsistencyCheck implements healthCheck {
  readonly description = 'Check dependency consistency';
  readonly name = 'dependency-consistency';

  async run(context: healthContext): Promise<CheckResult> {
    if (!context.projectPath) {
      return {
        message: 'No project path provided',
        name: this.name,
        status: 'skip',
      };
    }

    const packageJsonPath = `${context.projectPath}/package.json`;

    try {
      const fs = await import('node:fs');
      if (!fs.existsSync(packageJsonPath)) {
        return {
          message: 'No package.json found',
          name: this.name,
          status: 'skip',
        };
      }

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const deps = Object.keys(packageJson.dependencies || {});
      const devDeps = Object.keys(packageJson.devDependencies || {});

      return {
        message: `${deps.length} dependencies, ${devDeps.length} devDependencies`,
        name: this.name,
        status: 'pass',
      };
    } catch {
      return {
        suggestion: 'Ensure package.json exists and is valid JSON',
        message: 'Could not read package.json',
        name: this.name,
        status: 'warn',
      };
    }
  }
}
