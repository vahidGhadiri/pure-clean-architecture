import path from 'node:path';

import type { IFileSystemService, ITerminalService } from '../../domain/interfaces.js';
import type { TemplateRenderer } from './renderer.js';

interface OverlayDefinition {
  condition: boolean;
  name: string;
  path: string;
}

export interface TemplateCompositionPlan {
  overlays: OverlayDefinition[];
  base: string;
}

interface TemplateComposerDeps {
  fileSystem: IFileSystemService;
  terminal: ITerminalService;
  renderer: TemplateRenderer;
}

export class TemplateComposer {
  constructor(private readonly deps: TemplateComposerDeps) {}

  async compose(plan: TemplateCompositionPlan, destDir: string, variables: Record<string, unknown>): Promise<void> {
    await this.deps.renderer.render(plan.base, destDir, variables);

    for (const overlay of plan.overlays) {
      if (!overlay.condition) continue;
      if (!(await this.deps.fileSystem.pathExists(overlay.path))) continue;

      this.deps.terminal.update(`Applying overlay: ${overlay.name}...`);
      await this.applyOverlay(overlay.path, destDir, variables);
    }
  }

  private async mergePackageJsonFragment(
    fragmentPath: string,
    destDir: string,
    variables: Record<string, unknown>
  ): Promise<void> {
    const destPackageJsonPath = path.join(destDir, 'package.json');

    const fragmentContent = await this.deps.fileSystem.readFile(fragmentPath);
    const Handlebars = await import('handlebars');
    const template = Handlebars.default.compile(fragmentContent, { noEscape: true });
    const rendered = template(variables);
    const fragment = JSON.parse(rendered) as Record<string, unknown>;

    if (!(await this.deps.fileSystem.pathExists(destPackageJsonPath))) {
      await this.deps.fileSystem.writeJson(destPackageJsonPath, fragment);
      return;
    }

    const base = await this.deps.fileSystem.readJson(destPackageJsonPath);

    const merged = {
      ...base,
      ...fragment,
      devDependencies: {
        ...(base.devDependencies as Record<string, string>),
        ...(fragment.devDependencies as Record<string, string>),
      },
      dependencies: {
        ...(base.dependencies as Record<string, string>),
        ...(fragment.dependencies as Record<string, string>),
      },
      scripts: {
        ...(base.scripts as Record<string, string>),
        ...(fragment.scripts as Record<string, string>),
      },
    };

    await this.deps.fileSystem.writeJson(destPackageJsonPath, merged);
  }

  private async applyOverlay(overlayPath: string, destDir: string, variables: Record<string, unknown>): Promise<void> {
    const overlayFiles = await this.deps.fileSystem.walk(overlayPath);

    for (const file of overlayFiles) {
      const relativePath = path.relative(overlayPath, file);
      const targetPath = path.join(destDir, relativePath);

      if (relativePath === 'package.json.hbs') {
        await this.mergePackageJsonFragment(file, destDir, variables);
        continue;
      }

      const content = await this.deps.fileSystem.readFile(file);
      const isTemplate = relativePath.endsWith('.hbs');
      const targetClean = isTemplate ? targetPath.slice(0, -'.hbs'.length) : targetPath;

      await this.deps.fileSystem.ensureDirectory(path.dirname(targetClean));

      if (isTemplate) {
        const Handlebars = await import('handlebars');
        const template = Handlebars.default.compile(content, { noEscape: true });
        const rendered = template(variables);
        await this.deps.fileSystem.writeFile(targetClean, rendered);
      } else {
        await this.deps.fileSystem.copy(file, targetClean);
      }
    }
  }
}
