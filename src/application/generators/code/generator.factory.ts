import { RepositoryGenerator } from './generators/repository.generator.js';
import { FeatureGenerator } from './generators/feature.generator.js';
import { ServiceGenerator } from './generators/service.generator.js';
import { UseCaseGenerator } from './generators/usecase.generator.js';
import type { CodeGenerator } from './code-generator.interface.js';
import { EntityGenerator } from './generators/entity.generator.js';
import { ModuleGenerator } from './generators/module.generator.js';

const generators: Record<string, () => CodeGenerator> = {
    repository: () => new RepositoryGenerator(),
    feature: () => new FeatureGenerator(),
    service: () => new ServiceGenerator(),
    usecase: () => new UseCaseGenerator(),
    module: () => new ModuleGenerator(),
    entity: () => new EntityGenerator(),
};

export function createCodeGenerator(type: string): CodeGenerator {
    const factory = generators[type];

    if (!factory) {
        throw new Error(`Unknown generator type: ${type}. Available: ${Object.keys(generators).join(', ')}`);
    }

    return factory();
}
