import path from 'node:path';
import fs from 'fs-extra';

export class FileSystemService {
    async walk(dir: string): Promise<string[]> {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const files: string[] = [];

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                files.push(...(await this.walk(fullPath)));
            } else {
                files.push(fullPath);
            }
        }

        return files;
    }

    async writeJson(filePath: string, data: Record<string, unknown>): Promise<void> {
        await fs.writeJson(filePath, data, { spaces: 2 });
    }

    async writeFile(filePath: string, content: string): Promise<void> {
        await fs.writeFile(filePath, content, 'utf-8');
    }

    async copy(source: string, destination: string): Promise<void> {
        await fs.copy(source, destination);
    }

    async readJson(filePath: string): Promise<Record<string, unknown>> {
        return fs.readJson(filePath);
    }

    async readFile(filePath: string): Promise<string> {
        return fs.readFile(filePath, 'utf-8');
    }

    async ensureDirectory(filePath: string): Promise<void> {
        await fs.ensureDir(filePath);
    }

    async pathExists(filePath: string): Promise<boolean> {
        return fs.pathExists(filePath);
    }

    async remove(filePath: string): Promise<void> {
        await fs.remove(filePath);
    }
}
