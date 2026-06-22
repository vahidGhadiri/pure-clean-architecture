import { PackageJsonTransformer } from '../shared/transformers/package-json.transformer.js';
import { InstallerFactory } from '../infrastructure/package-manager/installer.factory.js';
import { FileSystemService } from '../infrastructure/filesystem/file-system.service.js';
import { TerminalService } from '../infrastructure/terminal/terminal.service.js';
import { TemplateComposer } from '../infrastructure/template/composer.js';
import { TemplateRenderer } from '../infrastructure/template/renderer.js';
import { TemplateResolver } from '../infrastructure/template/resolver.js';
import { TemplateGenerator } from '../application/template.generator.js';
import { DependencyResolver } from '../domain/dependency.resolver.js';
import { InitHandler } from '../application/init.handler.js';

export function createInitHandler(): InitHandler {
  const fileSystem = new FileSystemService();
  const terminal = new TerminalService();
  const templateResolver = new TemplateResolver();
  const dependencyResolver = new DependencyResolver();
  const templateRenderer = new TemplateRenderer({ fileSystem, terminal });
  const templateComposer = new TemplateComposer({ renderer: templateRenderer, fileSystem, terminal });
  const transformers = [new PackageJsonTransformer(fileSystem)];
  const installerFactory = new InstallerFactory();

  const templateGenerator = new TemplateGenerator({
    templateComposer,
    transformers,
    terminal,
  });

  return new InitHandler({
    dependencyResolver,
    templateGenerator,
    templateResolver,
    installerFactory,
    fileSystem,
    terminal,
  });
}
