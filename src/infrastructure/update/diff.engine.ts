import crypto from 'node:crypto';

export type FileStatus = 'template-updated' | 'user-modified' | 'unchanged';

export class DiffEngine {
    identifyStatus(originalChecksum: string, currentContent: string, templateContent: string): FileStatus {
        const currentChecksum = this.computeChecksum(currentContent);

        if (currentChecksum === originalChecksum) {
            if (currentChecksum === this.computeChecksum(templateContent)) {
                return 'unchanged';
            }
            return 'template-updated';
        }

        return 'user-modified';
    }

    computeChecksum(content: string): string {
        return crypto.createHash('sha256').update(content).digest('hex');
    }
}
