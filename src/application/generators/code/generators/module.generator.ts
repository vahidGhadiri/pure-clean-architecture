import type { CodeGeneratorResult, CodeGeneratorInput, CodeGenerator } from '../code-generator.interface.js';
import { toPascalCase, toCamelCase } from '../../../../shared/naming.js';

export class ModuleGenerator implements CodeGenerator {
  readonly type = 'module';

  async generate(input: CodeGeneratorInput): Promise<CodeGeneratorResult> {
    const { targetDirectory, name } = input;
    const pascal = toPascalCase(name);
    const camel = toCamelCase(name);

    return {
      files: [
        // Domain
        {
          path: `${targetDirectory}/src/modules/${name}/domain/${name}.entity.ts`,
          content: this.generateEntity(pascal, camel),
        },
        {
          path: `${targetDirectory}/src/modules/${name}/domain/${name}.errors.ts`,
          content: this.generateErrors(pascal),
        },
        {
          path: `${targetDirectory}/src/modules/${name}/domain/${name}.repository.ts`,
          content: this.generateRepositoryPort(pascal),
        },
        {
          content: `export { ${pascal} } from "./${name}.entity";\nexport type { I${pascal}Repository } from "./${name}.repository";\n`,
          path: `${targetDirectory}/src/modules/${name}/domain/index.ts`,
        },
        // Application
        {
          path: `${targetDirectory}/src/modules/${name}/application/dto/${name}.dto.ts`,
          content: this.generateDto(pascal),
        },
        {
          path: `${targetDirectory}/src/modules/${name}/application/dto/index.ts`,
          content: `export type { ${pascal}Dto } from "./${name}.dto";\n`,
        },
        {
          path: `${targetDirectory}/src/modules/${name}/application/use-cases/create-${name}.use-case.ts`,
          content: this.generateCreateUseCase(pascal, camel),
        },
        {
          path: `${targetDirectory}/src/modules/${name}/application/use-cases/get-${name}.use-case.ts`,
          content: this.generateGetUseCase(pascal, camel),
        },
        {
          content: `export { Create${pascal}UseCase } from "./create-${name}.use-case";\nexport { Get${pascal}UseCase, Get${pascal}sUseCase } from "./get-${name}.use-case";\n`,
          path: `${targetDirectory}/src/modules/${name}/application/use-cases/index.ts`,
        },
        {
          content: `export type { ${pascal}Dto } from "./dto";\nexport { Create${pascal}UseCase } from "./use-cases";\nexport { Get${pascal}UseCase, Get${pascal}sUseCase } from "./use-cases";\n`,
          path: `${targetDirectory}/src/modules/${name}/application/index.ts`,
        },
        // Infrastructure
        {
          path: `${targetDirectory}/src/modules/${name}/infrastructure/${name}.endpoints.ts`,
          content: this.generateEndpoints(pascal, name),
        },
        {
          path: `${targetDirectory}/src/modules/${name}/infrastructure/${name}.mapper.ts`,
          content: this.generateMapper(pascal),
        },
        {
          path: `${targetDirectory}/src/modules/${name}/infrastructure/${name}.repository.ts`,
          content: this.generateRepositoryImpl(pascal, name),
        },
        {
          content: `export { ${pascal}Endpoints } from "./${name}.endpoints";\nexport { ${pascal}Repository } from "./${name}.repository";\n`,
          path: `${targetDirectory}/src/modules/${name}/infrastructure/index.ts`,
        },
        // Provider
        {
          path: `${targetDirectory}/src/modules/${name}/${name}.provider.ts`,
          content: this.generateProvider(pascal),
        },
        // Public API
        {
          path: `${targetDirectory}/src/modules/${name}/index.ts`,
          content: this.generatePublicApi(pascal, name),
        },
      ],
    };
  }

  private generateRepositoryImpl(pascal: string, name: string): string {
    return `import type { IHttp } from "@shared/contracts";
import type { I${pascal}Repository } from "@modules/${name}/domain";
import type { ${pascal} } from "@modules/${name}/domain";
import { ${pascal}Endpoints } from "./${name}.endpoints";
import { toDomain } from "./${name}.mapper";

export class ${pascal}Repository implements I${pascal}Repository {
  constructor(private readonly http: IHttp<${pascal}Endpoints>) {}

  async findById(id: string): Promise<${pascal}> {
    const raw = await this.http.request<"GET_${name.toUpperCase()}", unknown>({
      endpoint: "GET_${name.toUpperCase()}",
      method: "GET",
      pathParams: { id },
    });
    return toDomain(raw);
  }

  async findAll(): Promise<${pascal}[]> {
    const raw = await this.http.request<"GET_${name.toUpperCase()}S", unknown[]>({
      endpoint: "GET_${name.toUpperCase()}S",
      method: "GET",
    });
    return raw.map(toDomain);
  }

  async create(data: Parameters<I${pascal}Repository["create"]>[0]): Promise<${pascal}> {
    const raw = await this.http.request<"CREATE_${name.toUpperCase()}", unknown>({
      endpoint: "CREATE_${name.toUpperCase()}",
      method: "POST",
      body: data,
    });
    return toDomain(raw);
  }

  async update(id: string, data: Parameters<I${pascal}Repository["update"]>[1]): Promise<${pascal}> {
    const raw = await this.http.request<"UPDATE_${name.toUpperCase()}", unknown>({
      endpoint: "UPDATE_${name.toUpperCase()}",
      method: "PATCH",
      pathParams: { id },
      body: data,
    });
    return toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.http.request<"DELETE_${name.toUpperCase()}", void>({
      endpoint: "DELETE_${name.toUpperCase()}",
      method: "DELETE",
      pathParams: { id },
    });
  }
}
`;
  }

  private generateProvider(pascal: string): string {
    return `import type { IHttp } from "@shared/contracts";
import { createModuleProvider } from "@shared/kernel";
import { ${pascal}Endpoints } from "./infrastructure";
import { ${pascal}Repository } from "./infrastructure";
import { Create${pascal}UseCase, Get${pascal}UseCase, Get${pascal}sUseCase } from "./application";

export { ${pascal}Endpoints };

interface ${pascal}Deps {
  http: IHttp<typeof ${pascal}Endpoints>;
}

export const create${pascal}Provider = createModuleProvider<
  ${pascal}Deps,
  ${pascal}Repository,
  {
    create${pascal}: Create${pascal}UseCase;
    get${pascal}: Get${pascal}UseCase;
    get${pascal}s: Get${pascal}sUseCase;
  }
>({
  createRepository: ({ http }) => new ${pascal}Repository(http),
  createUseCases: (repository) => ({
    create${pascal}: new Create${pascal}UseCase(repository),
    get${pascal}: new Get${pascal}UseCase(repository),
    get${pascal}s: new Get${pascal}sUseCase(repository),
  }),
});
`;
  }

  private generateEntity(pascal: string, camel: string): string {
    return `import { ok, err, AppError } from "@shared/kernel";
import type { Result } from "@shared/kernel";

export class ${pascal} {
  private constructor(private readonly props: ${pascal}Props) {}

  get id(): string {
    return this.props.id;
  }

  public static create(input: { id: string; /* TODO: Add fields */ }): Result<${pascal}> {
    if (!input.id) {
      return err(new AppError({ message: "ID is required", code: "VALIDATION_ERROR" }));
    }

    const now = new Date();
    const ${camel} = new ${pascal}({
      ...input,
      createdAt: now,
      updatedAt: now,
    });

    return ok(${camel});
  }

  public static reconstitute(data: ${pascal}Props): ${pascal} {
    return new ${pascal}(data);
  }
}

interface ${pascal}Props {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // TODO: Add fields
}
`;
  }

  private generatePublicApi(pascal: string, name: string): string {
    return `import type { IHttp } from "@shared/contracts";
import type { ${pascal}Dto } from "./application";
import { create${pascal}Provider, ${pascal}Endpoints } from "./${name}.provider";

export type { ${pascal}Dto } from "./application";
export { ${pascal}Endpoints };

export interface ${pascal}Module {
  readonly create${pascal}: import("./application").Create${pascal}UseCase;
  readonly get${pascal}: import("./application").Get${pascal}UseCase;
  readonly get${pascal}s: import("./application").Get${pascal}sUseCase;
}

export function create${pascal}Module(
  http: IHttp<typeof ${pascal}Endpoints>,
): ${pascal}Module {
  return create${pascal}Provider({ http });
}
`;
  }

  private generateGetUseCase(pascal: string, camel: string): string {
    return `import { ok } from "@shared/kernel";
import type { Result } from "@shared/kernel";
import type { ${pascal} } from "@modules/${camel}/domain";
import type { I${pascal}Repository } from "@modules/${camel}/domain";

export class Get${pascal}UseCase {
  constructor(private readonly repository: I${pascal}Repository) {}

  async execute(id: string): Promise<Result<${pascal}>> {
    return ok(await this.repository.findById(id));
  }
}

export class Get${pascal}sUseCase {
  constructor(private readonly repository: I${pascal}Repository) {}

  async execute(): Promise<Result<${pascal}[]>> {
    return ok(await this.repository.findAll());
  }
}
`;
  }

  private generateCreateUseCase(pascal: string, camel: string): string {
    return `import { ok } from "@shared/kernel";
import type { Result } from "@shared/kernel";
import { ${pascal} } from "@modules/${camel}/domain";
import type { I${pascal}Repository } from "@modules/${camel}/domain";

export class Create${pascal}UseCase {
  constructor(private readonly repository: I${pascal}Repository) {}

  async execute(): Promise<Result<${pascal}>> {
    // TODO: Implement create logic
    throw new Error("Not implemented");
  }
}
`;
  }

  private generateRepositoryPort(pascal: string): string {
    return `export interface I${pascal}Repository {
  findById(id: string): Promise<${pascal}>;
  findAll(): Promise<${pascal}[]>;
  create(data: ${pascal}CreateData): Promise<${pascal}>;
  update(id: string, data: ${pascal}UpdateData): Promise<${pascal}>;
  delete(id: string): Promise<void>;
}

interface ${pascal}CreateData {
  // TODO: Add fields
}

interface ${pascal}UpdateData {
  // TODO: Add fields
}
`;
  }

  private generateEndpoints(pascal: string, name: string): string {
    return `export const ${pascal}Endpoints = {
  GET_${name.toUpperCase()}: "/api/${name}/:id",
  GET_${name.toUpperCase()}S: "/api/${name}",
  CREATE_${name.toUpperCase()}: "/api/${name}",
  UPDATE_${name.toUpperCase()}: "/api/${name}/:id",
  DELETE_${name.toUpperCase()}: "/api/${name}/:id",
} as const;

export type ${pascal}Endpoints = typeof ${pascal}Endpoints;
`;
  }

  private generateErrors(pascal: string): string {
    return `import { AppError } from "@shared/kernel";

export class ${pascal}NotFoundError extends AppError {
  constructor(id?: string | number) {
    const message = id ? \`${pascal} with id "\${id}" was not found\` : \`${pascal} not found\`;
    super({ message, code: "NOT_FOUND" });
    this.name = "${pascal}NotFoundError";
  }
}
`;
  }

  private generateMapper(pascal: string): string {
    return `// TODO: Implement domain ↔ API mapping functions
export function toDomain(raw: unknown): ${pascal} {
  throw new Error("Not implemented");
}
`;
  }

  private generateDto(pascal: string): string {
    return `export interface ${pascal}Dto {
  id: string;
  createdAt: string;
  updatedAt: string;
  // TODO: Add fields
}
`;
  }
}
