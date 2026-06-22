import type { ITerminalService, IGitService } from '../../domain/interfaces.js';
import { GitError } from '../../shared/errors/git.error.js';

export class GitServiceWrapper {
  constructor(
    private readonly git: IGitService,
    private readonly terminal: ITerminalService
  ) {}

  async initializeProject(projectPath: string): Promise<void> {
    if (!(await this.git.isAvailable())) {
      this.terminal.warning('Git is not installed. Skipping repository initialization.');
      return;
    }

    if (await this.git.isRepository(projectPath)) {
      this.terminal.warning('Directory is already a git repository. Skipping initialization.');
      return;
    }

    this.terminal.start('Initializing git repository...');

    try {
      await this.git.init(projectPath);
      await this.git.addAll(projectPath);
      await this.git.commit(projectPath, 'Initial commit');
      this.terminal.succeed('Git repository initialized');
    } catch (error) {
      if (error instanceof GitError) {
        this.terminal.warning(`Git initialization failed: ${error.message}`);
        this.terminal.warning('Continuing without git...');
        return;
      }
      throw error;
    }
  }
}
