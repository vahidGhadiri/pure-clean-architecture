import type { DependencySet } from './dependency.types.js';
import type { ProjectOptions } from './project.options.js';
import { packages } from './packages.js';

export class DependencyResolver {
  resolve(options: ProjectOptions): DependencySet {
    const dependencies: Record<string, string> = {};
    const devDependencies: Record<string, string> = {};

    switch (options.stateManagement) {
      case 'tanstack-zustand':
        dependencies[packages.reactQuery.name] = packages.reactQuery.version;
        dependencies[packages.zustand.name] = packages.zustand.version;
        break;

      case 'tanstack-query':
        dependencies[packages.reactQuery.name] = packages.reactQuery.version;
        break;

      case 'redux-toolkit':
        dependencies[packages.reduxToolkit.name] = packages.reduxToolkit.version;
        dependencies[packages.reactRedux.name] = packages.reactRedux.version;
        break;
    }

    if (options.tools.includes('eslint')) {
      devDependencies[packages.eslint.name] = packages.eslint.version;
      devDependencies[packages.eslintJs.name] = packages.eslintJs.version;
      devDependencies[packages.typescriptEslint.name] = packages.typescriptEslint.version;
    }

    if (options.tools.includes('dependency-cruiser')) {
      devDependencies[packages.dependencyCruiser.name] = packages.dependencyCruiser.version;
    }

    return { devDependencies, dependencies };
  }
}

// resolved via dependency.resolver
