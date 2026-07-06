import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

import type { TemplateDefinition } from '../../domain/template.types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveTemplatesDir(): string {
    const cliRoot = path.resolve(__dirname, '..', '..', '..');
    const devPath = path.join(cliRoot, 'templates');

    if (existsSync(devPath)) return devPath;

    const distPath = path.join(cliRoot, '..', 'templates');
    if (existsSync(distPath)) return distPath;

    return devPath;
}

const TEMPLATES_DIR = resolveTemplatesDir();

export class TemplateResolver {
    resolve(): TemplateDefinition {
        return {
            path: path.join(TEMPLATES_DIR, 'react', 'base'),
            name: 'react-base',
            framework: 'react',
        };
    }
}
