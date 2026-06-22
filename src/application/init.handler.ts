import type {
  IDependencyResolver,
  ITemplateGenerator,
  IFileSystemService,
  ITemplateResolver,
  IInstallerFactory,
  ITerminalService,
} from '../domain/interfaces.js';
import { InstallerService } from '../infrastructure/package-manager/installer.service.js';
import { DependencyTransformer } from '../shared/transformers/dependency.transformer.js';
import { installDependenciesPrompt, createProjectOptions } from './prompts/index.js';
import { GitServiceWrapper } from '../infrastructure/git/git.service.wrapper.js';
import { GitService } from '../infrastructure/git/git.service.js';

interface InitHandlerDeps {
  dependencyResolver: IDependencyResolver;
  templateGenerator: ITemplateGenerator;
  templateResolver: ITemplateResolver;
  installerFactory: IInstallerFactory;
  fileSystem: IFileSystemService;
  terminal: ITerminalService;
}

export class InitHandler {
  constructor(private readonly deps: InitHandlerDeps) {}

  async execute(): Promise<void> {
    const options = await createProjectOptions();
    const projectPath = `${options.targetDirectory}/${options.projectName}`;

    this.deps.terminal.step(1, 3, 'Resolving template...');
    const template = this.deps.templateResolver.resolve(options);

    this.deps.terminal.step(2, 3, 'Resolving dependencies...');
    const dependencies = this.deps.dependencyResolver.resolve(options);

    this.deps.terminal.step(3, 3, 'Generating project...');
    const dependencyTransformer = new DependencyTransformer(this.deps.fileSystem, dependencies);

    await this.deps.templateGenerator.generate({
      extraTransformers: [dependencyTransformer],
      dependencies,
      template,
      options,
    });

    const shouldInstall = await installDependenciesPrompt();

    if (shouldInstall) {
      this.deps.terminal.blank();
      const installer = this.deps.installerFactory.create(options.packageManager);
      const installerService = new InstallerService(installer, this.deps.terminal);
      await installerService.installDependencies(projectPath);
    } else {
      this.deps.terminal.blank();
      this.deps.terminal.info(
        `Run "cd ${projectPath} && ${options.packageManager} install" to install dependencies later.`
      );
    }

    this.deps.terminal.blank();
    const gitService = new GitService();
    const gitWrapper = new GitServiceWrapper(gitService, this.deps.terminal);
    await gitWrapper.initializeProject(projectPath);

    this.deps.terminal.blank();
    this.deps.terminal.success(`Project "${options.projectName}" created successfully, Enjoy Clean Architecture!`);
  }
}
