export interface ContextConfig<TDependencies, TRepository, TServices> {
    createRepository: (dependencies: TDependencies) => TRepository;
    createServices: (repository: TRepository) => TServices;
}

export function createContext<TDependencies, TRepository, TServices>(
    config: ContextConfig<TDependencies, TRepository, TServices>
): (dependencies: TDependencies) => TServices {
    return (dependencies: TDependencies): TServices => {
        const repository = config.createRepository(dependencies);
        return config.createServices(repository);
    };
}
