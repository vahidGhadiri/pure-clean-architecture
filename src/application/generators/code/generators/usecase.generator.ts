import type { CodeGeneratorResult, CodeGeneratorInput, CodeGenerator } from '../code-generator.interface.js';
import { toPascalCase } from '../../../../shared/naming.js';

export class UseCaseGenerator implements CodeGenerator {
  readonly type = 'usecase';

  async generate(input: CodeGeneratorInput): Promise<CodeGeneratorResult> {
    const { targetDirectory, name } = input;
    const pascal = toPascalCase(name);

    return {
      files: [
        {
          content: `export class ${pascal}UseCase {
  constructor() {}

  async execute() {
    // TODO: Implement use case logic
  }
}
`,
          path: `${targetDirectory}/src/application/use-cases/${name}.usecase.ts`,
        },
      ],
    };
  }
}
