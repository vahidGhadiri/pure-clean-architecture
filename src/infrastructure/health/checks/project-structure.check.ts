import type { healthContext, healthCheck, CheckResult } from '../check.interface.js';

export class ProjectStructureCheck implements healthCheck {
  readonly description = 'Verify clean architecture project structure';
  readonly name = 'project-structure';

  async run(context: healthContext): Promise<CheckResult> {
    if (!context.projectPath) {
      return {
        message: 'No project path provided',
        name: this.name,
        status: 'skip',
      };
    }

    const requiredFiles = ['package.json', 'tsconfig.json'];
    const issues: string[] = [];

    for (const file of requiredFiles) {
      const filePath = `${context.projectPath}/${file}`;
      try {
        const fs = await import('node:fs');
        if (!fs.existsSync(filePath)) {
          issues.push(`Missing ${file}`);
        }
      } catch {
        issues.push(`Cannot check ${file}`);
      }
    }

    if (issues.length === 0) {
      return {
        message: 'Project structure looks valid',
        name: this.name,
        status: 'pass',
      };
    }

    return {
      suggestion: 'Run `pure-clean init` to create a properly structured project',
      message: `Issues found: ${issues.join(', ')}`,
      name: this.name,
      status: 'fail',
    };
  }
}
