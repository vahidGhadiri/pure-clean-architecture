import { Command } from 'commander';

import { DependencyConsistencyCheck } from '../../infrastructure/health/checks/dependency-consistency.check.js';
import { ProjectStructureCheck } from '../../infrastructure/health/checks/project-structure.check.js';
import { PackageManagerCheck } from '../../infrastructure/health/checks/package-manager.check.js';
import { NodeVersionCheck } from '../../infrastructure/health/checks/node-version.check.js';
import { TerminalService } from '../../infrastructure/terminal/terminal.service.js';
import { healthService } from '../../infrastructure/health/health.service.js';
import { GitCheck } from '../../infrastructure/health/checks/git.check.js';
import { handleError } from '../../shared/errors/error.handler.js';

export const createhealthCommand = () => {
    const command = new Command('health');

    command
        .description('Check environment and project health')
        .option('-p, --project <path>', 'Project path to check')
        .action(async (options) => {
            try {
                const terminal = new TerminalService();

                const checks = [
                    new DependencyConsistencyCheck(),
                    new PackageManagerCheck(),
                    new ProjectStructureCheck(),
                    new NodeVersionCheck(),
                    new GitCheck(),
                ];
                const health = new healthService(checks, terminal);

                await health.runAll({
                    projectPath: options.project,
                    nodeVersion: process.version,
                });
            } catch (error) {
                handleError(error);
            }
        });

    return command;
};
