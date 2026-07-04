import { execa } from 'execa';

import type { IGitService } from '../../domain/interfaces.js';
import { GitError } from '../../shared/errors/git.error.js';

export class GitService implements IGitService {
    async commit(projectPath: string, message: string): Promise<void> {
        try {
            await execa('git', ['commit', '-m', message], { cwd: projectPath });
        } catch (error) {
            throw new GitError('Failed to create commit', {
                suggestion: 'Check git configuration (user.name, user.email)',
                cause: error instanceof Error ? error : undefined,
            });
        }
    }

    async init(projectPath: string): Promise<void> {
        try {
            await execa('git', ['init'], { cwd: projectPath });
        } catch (error) {
            throw new GitError('Failed to initialize git repository', {
                suggestion: 'Ensure git is installed and you have write permissions',
                cause: error instanceof Error ? error : undefined,
            });
        }
    }

    async addAll(projectPath: string): Promise<void> {
        try {
            await execa('git', ['add', '.'], { cwd: projectPath });
        } catch (error) {
            throw new GitError('Failed to stage files', {
                cause: error instanceof Error ? error : undefined,
            });
        }
    }

    async isRepository(projectPath: string): Promise<boolean> {
        try {
            await execa('git', ['rev-parse', '--git-dir'], { cwd: projectPath });
            return true;
        } catch {
            return false;
        }
    }

    async isAvailable(): Promise<boolean> {
        try {
            await execa('git', ['--version']);
            return true;
        } catch {
            return false;
        }
    }
}
