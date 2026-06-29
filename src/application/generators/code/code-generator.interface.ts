export interface CodeGeneratorInput {
    targetDirectory: string;
    name: string;
}

export interface GeneratedFile {
    content: string;
    path: string;
}

export interface CodeGeneratorResult {
    files: GeneratedFile[];
}

export interface CodeGenerator {
    generate(input: CodeGeneratorInput): Promise<CodeGeneratorResult>;
    readonly type: string;
}
