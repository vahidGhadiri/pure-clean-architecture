import type { GeneratorContext } from '../application/generator.types.js';
import type { TemplateDefinition } from './template.types.js';
import type { DependencySet } from './dependency.types.js';
import type { ProjectOptions } from './project.options.js';

export interface ITemplateResolver {
    resolve(options: ProjectOptions): TemplateDefinition;
}

export interface ITemplateRenderer {
    render(templateDir: string, destDir: string, variables: Record<string, unknown>): Promise<void>;
}

export interface IDependencyResolver {
    resolve(options: ProjectOptions): DependencySet;
}

export interface IFileSystemService {
    writeJson(path: string, data: Record<string, unknown>): Promise<void>;
    copy(source: string, destination: string): Promise<void>;
    readJson(path: string): Promise<Record<string, unknown>>;
    writeFile(path: string, content: string): Promise<void>;
    ensureDirectory(path: string): Promise<void>;
    pathExists(path: string): Promise<boolean>;
    readFile(path: string): Promise<string>;
    walk(dir: string): Promise<string[]>;
    remove(path: string): Promise<void>;
}

export interface ITerminalService {
    step(current: number, total: number, message: string): void;
    succeed(message?: string): void;
    success(message: string): void;
    warning(message: string): void;
    update(message: string): void;
    start(message: string): void;
    fail(message?: string): void;
    error(message: string): void;
    info(message: string): void;
    blank(): void;
    stop(): void;
}

export interface IPackageInstaller {
    install(projectPath: string): Promise<void>;
}

export interface IInstallerFactory {
    create(manager: string): IPackageInstaller;
}

export interface IGitService {
    commit(projectPath: string, message: string): Promise<void>;
    isRepository(path: string): Promise<boolean>;
    addAll(projectPath: string): Promise<void>;
    init(projectPath: string): Promise<void>;
    isAvailable(): Promise<boolean>;
}

export interface ITemplateTransformer {
    transform(projectPath: string, options: ProjectOptions): Promise<void>;
}

export interface ITemplateGenerator {
    generate(context: GeneratorContext): Promise<void>;
}
