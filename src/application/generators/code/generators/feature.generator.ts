import type { CodeGeneratorResult, CodeGeneratorInput, CodeGenerator } from '../code-generator.interface.js';
import { toPascalCase } from '../../../../shared/naming.js';

export class FeatureGenerator implements CodeGenerator {
  readonly type = 'feature';

  async generate(input: CodeGeneratorInput): Promise<CodeGeneratorResult> {
    const { targetDirectory, name } = input;
    const pascal = toPascalCase(name);

    return {
      files: [
        {
          path: `${targetDirectory}/src/features/${name}/components/index.ts`,
          content: `// Add your presentational components here\nexport {};\n`,
        },
        {
          path: `${targetDirectory}/src/features/${name}/hooks/index.ts`,
          content: `// Add your React Query hooks here\nexport {};\n`,
        },
        {
          path: `${targetDirectory}/src/features/${name}/pages/main/index.tsx`,
          content: this.generatePage(pascal),
        },
        {
          content: `export const ${pascal}Strings = {\n  // Add your strings here\n} as const;\n`,
          path: `${targetDirectory}/src/features/${name}/pages/main/strings.ts`,
        },
        {
          path: `${targetDirectory}/src/features/${name}/router.tsx`,
          content: this.generateRouter(pascal, name),
        },
        {
          path: `${targetDirectory}/src/features/${name}/index.ts`,
          content: `export { router } from "./router";\n`,
        },
      ],
    };
  }

  private generateRouter(_pascal: string, name: string): string {
    return `import { createBrowserRouter } from "react-router-dom";
import ${_pascal}Page from "./pages/main";

export const router = createBrowserRouter([
  {
    path: "/${name}",
    element: <${_pascal}Page />,
  },
]);
`;
  }

  private generatePage(pascal: string): string {
    return `export default function ${pascal}Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">${pascal}</h1>
      {/* TODO: Add your content here */}
    </div>
  );
}
`;
  }
}
