import type { CodeGeneratorResult, CodeGeneratorInput, CodeGenerator } from '../code-generator.interface.js';
import { toPascalCase } from '../../../../shared/naming.js';

export class RepositoryGenerator implements CodeGenerator {
  readonly type = 'repository';

  async generate(input: CodeGeneratorInput): Promise<CodeGeneratorResult> {
    const { targetDirectory, name } = input;
    const pascal = toPascalCase(name);

    return {
      files: [
        {
          content: `export interface ${pascal}Repository {
  findById(params: { pathParams: { id: string } }): Promise<${pascal} | null>;
  findAll(): Promise<${pascal}[]>;
  create(params: { body: Omit<${pascal}, "id"> }): Promise<${pascal}>;
  update(params: { pathParams: { id: string }; body: Partial<${pascal}> }): Promise<${pascal}>;
  delete(params: { pathParams: { id: string } }): Promise<void>;
}
`,
          path: `${targetDirectory}/src/domain/repositories/${name}.repository.ts`,
        },
        {
          content: `import type { ${pascal}Repository } from "../../domain/repositories/${name}.repository.js";

export class ${pascal}RepositoryImpl implements ${pascal}Repository {
  public findById: ${pascal}Repository['findById'] = async ({ pathParams }) => {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  };

  public findAll: ${pascal}Repository['findAll'] = async () => {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  };

  public create: ${pascal}Repository['create'] = async ({ body }) => {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  };

  public update: ${pascal}Repository['update'] = async ({ pathParams, body }) => {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  };

  public delete: ${pascal}Repository['delete'] = async ({ pathParams }) => {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  };
}
`,
          path: `${targetDirectory}/src/infrastructure/repositories/${name}.repository.impl.ts`,
        },
      ],
    };
  }
}
