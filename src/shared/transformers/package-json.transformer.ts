import type { ITemplateTransformer, IFileSystemService } from '../../domain/interfaces.js';
import type { ProjectOptions } from '../../domain/project.options.js';

export class PackageJsonTransformer implements ITemplateTransformer {
  constructor(private readonly fileSystem: IFileSystemService) {}

  async transform(projectPath: string, options: ProjectOptions): Promise<void> {
    const packageJsonPath = `${projectPath}/package.json`;
    const packageJson = await this.fileSystem.readJson(packageJsonPath);
    packageJson.name = options.projectName;
    await this.fileSystem.writeJson(packageJsonPath, packageJson);
  }
}
