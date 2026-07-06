import Handlebars from 'handlebars';
import path from 'node:path';

import type { IFileSystemService, ITerminalService } from '../../domain/interfaces.js';
import { TemplateError } from '../../shared/errors/template.error.js';

interface TemplateRendererDeps {
    fileSystem: IFileSystemService;
    terminal: ITerminalService;
}

const HBS_EXTENSION = '.hbs';

export class TemplateRenderer {
    constructor(private readonly deps: TemplateRendererDeps) {
        this.registerHelpers();
    }

    async render(templateDir: string, destDir: string, variables: Record<string, unknown>): Promise<void> {
        await this.deps.fileSystem.ensureDirectory(destDir);

        const files = await this.deps.fileSystem.walk(templateDir);

        for (const file of files) {
            const relativePath = path.relative(templateDir, file);
            const isTemplate = relativePath.endsWith(HBS_EXTENSION);

            const targetRelative = isTemplate ? relativePath.slice(0, -HBS_EXTENSION.length) : relativePath;

            const targetPath = path.join(destDir, targetRelative);

            await this.deps.fileSystem.ensureDirectory(path.dirname(targetPath));

            if (isTemplate) {
                await this.renderFile(file, targetPath, variables);
            } else {
                await this.deps.fileSystem.copy(file, targetPath);
            }
        }
    }

    private async renderFile(source: string, target: string, variables: Record<string, unknown>): Promise<void> {
        const content = await this.deps.fileSystem.readFile(source);

        try {
            const template = Handlebars.compile(content, { noEscape: true });
            const rendered = template(variables);
            await this.deps.fileSystem.writeFile(target, rendered);
        } catch (error) {
            throw new TemplateError(`Failed to render template: ${path.basename(source)}`, {
                suggestion: `Check for syntax errors in ${path.basename(source)}`,
                cause: error instanceof Error ? error : undefined,
            });
        }
    }

    private registerHelpers(): void {
        Handlebars.registerHelper('eq', (a: string, b: string) => a === b);
        Handlebars.registerHelper('ne', (a: string, b: string) => a !== b);
        Handlebars.registerHelper(
            'includes',
            (arr: unknown[], val: unknown) => Array.isArray(arr) && arr.includes(val)
        );
    }
}
