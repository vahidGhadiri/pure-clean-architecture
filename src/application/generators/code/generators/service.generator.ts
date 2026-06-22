import type { CodeGeneratorResult, CodeGeneratorInput, CodeGenerator } from '../code-generator.interface.js';
import { toPascalCase } from '../../../../shared/naming.js';

export class ServiceGenerator implements CodeGenerator {
  readonly type = 'service';

  async generate(input: CodeGeneratorInput): Promise<CodeGeneratorResult> {
    const { targetDirectory, name } = input;
    const pascal = toPascalCase(name);

    return {
      files: [
        {
          content: `export class ${pascal}Service {
  constructor() {}

  // TODO: Implement service logic
}
`,
          path: `${targetDirectory}/src/application/services/${name}.service.ts`,
        },
      ],
    };
  }
}
