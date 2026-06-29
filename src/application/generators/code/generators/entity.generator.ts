import type { CodeGeneratorResult, CodeGeneratorInput, CodeGenerator } from '../code-generator.interface.js';
import { toPascalCase } from '../../../../shared/naming.js';

export class EntityGenerator implements CodeGenerator {
    readonly type = 'entity';

    async generate(input: CodeGeneratorInput): Promise<CodeGeneratorResult> {
        const { targetDirectory, name } = input;
        const pascal = toPascalCase(name);

        return {
            files: [
                {
                    content: `export interface ${pascal} {
  id: string;
  // Define entity properties
  createdAt: Date;
  updatedAt: Date;
}

export function create${pascal}(data: Omit<${pascal}, "id" | "createdAt" | "updatedAt">): ${pascal} {
  return {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
`,
                    path: `${targetDirectory}/src/domain/entities/${name}.entity.ts`,
                },
            ],
        };
    }
}
