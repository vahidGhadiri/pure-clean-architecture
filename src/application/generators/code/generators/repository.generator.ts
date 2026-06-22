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
  findById(id: string): Promise<${pascal} | null>;
  findAll(): Promise<${pascal}[]>;
  create(data: Omit<${pascal}, "id">): Promise<${pascal}>;
  update(id: string, data: Partial<${pascal}>): Promise<${pascal}>;
  delete(id: string): Promise<void>;
}
`,
          path: `${targetDirectory}/src/domain/repositories/${name}.repository.ts`,
        },
        {
          content: `import type { ${pascal}Repository } from "../../domain/repositories/${name}.repository.js";

export class ${pascal}RepositoryImpl implements ${pascal}Repository {
  async findById(id: string) {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  }

  async findAll() {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  }

  async create(data: Parameters<${pascal}Repository["create"]>[0]) {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  }

  async update(id: string, data: Parameters<${pascal}Repository["update"]>[1]) {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  }

  async delete(id: string) {
    // TODO: Implement persistence logic
    throw new Error("Not implemented");
  }
}
`,
          path: `${targetDirectory}/src/infrastructure/repositories/${name}.repository.impl.ts`,
        },
      ],
    };
  }
}
