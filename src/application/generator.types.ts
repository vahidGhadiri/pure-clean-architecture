import type { TemplateDefinition } from '../domain/template.types.js';
import type { ITemplateTransformer } from '../domain/interfaces.js';
import type { DependencySet } from '../domain/dependency.types.js';
import type { ProjectOptions } from '../domain/project.options.js';

export interface GeneratorContext {
  extraTransformers?: ITemplateTransformer[];
  template: TemplateDefinition;
  dependencies: DependencySet;
  options: ProjectOptions;
}
