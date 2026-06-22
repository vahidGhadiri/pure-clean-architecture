import path from 'node:path';

import { resolveTemplateVariables } from '../infrastructure/template/variable.resolver.js';
import type { ITemplateTransformer, ITerminalService } from '../domain/interfaces.js';
import { resolveOverlays } from '../infrastructure/template/overlay.resolver.js';
import type { TemplateComposer } from '../infrastructure/template/composer.js';
import { FileSystemError } from '../shared/errors/filesystem.error.js';
import type { GeneratorContext } from './generator.types.js';

interface TemplateGeneratorDeps {
  transformers: ITemplateTransformer[];
  templateComposer: TemplateComposer;
  terminal: ITerminalService;
}

export class TemplateGenerator {
  constructor(private readonly deps: TemplateGeneratorDeps) {}

  async generate(context: GeneratorContext): Promise<void> {
    const { extraTransformers, template, options } = context;
    const destination = path.join(options.targetDirectory, options.projectName);

    try {
      const variables = resolveTemplateVariables(options);
      const overlays = resolveOverlays(options, template.path);

      await this.deps.templateComposer.compose({ base: template.path, overlays }, destination, variables);
    } catch (error) {
      throw new FileSystemError('Failed to generate project from template', {
        suggestion: `Ensure ${template.path} exists and is readable`,
        cause: error instanceof Error ? error : undefined,
      });
    }

    const allTransformers = [...this.deps.transformers, ...(extraTransformers ?? [])];

    for (const transformer of allTransformers) {
      await transformer.transform(destination, options);
    }
  }
}
