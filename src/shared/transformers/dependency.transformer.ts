import type { ITemplateTransformer, IFileSystemService } from '../../domain/interfaces.js';
import type { DependencySet } from '../../domain/dependency.types.js';

export class DependencyTransformer implements ITemplateTransformer {
    constructor(
        private readonly fileSystem: IFileSystemService,
        private readonly dependencies: DependencySet
    ) {}

    async transform(projectPath: string): Promise<void> {
        const packageJsonPath = `${projectPath}/package.json`;
        const packageJson = await this.fileSystem.readJson(packageJsonPath);

        const baseDeps = (packageJson.dependencies as Record<string, string>) || {};
        const baseDevDeps = (packageJson.devDependencies as Record<string, string>) || {};

        packageJson.dependencies = {
            ...baseDeps,
            ...this.dependencies.dependencies,
        };

        packageJson.devDependencies = {
            ...baseDevDeps,
            ...this.dependencies.devDependencies,
        };

        await this.fileSystem.writeJson(packageJsonPath, packageJson);
    }
}
