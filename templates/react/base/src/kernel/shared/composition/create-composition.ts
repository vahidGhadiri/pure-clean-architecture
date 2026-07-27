export interface CompositionConfig<TDependencies, TRepository, TServices> {
    createRepository: (dependencies: TDependencies) => TRepository;
    createServices: (repository: TRepository) => TServices;
}

export function createComposition<TDependencies, TRepository, TServices>(
    config: CompositionConfig<TDependencies, TRepository, TServices>
): (dependencies: TDependencies) => TServices {
    return (dependencies: TDependencies): TServices => {
        const repository = config.createRepository(dependencies);
        return config.createServices(repository);
    };
}
