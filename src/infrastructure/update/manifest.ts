export interface TemplateManifest {
    lastUpdated: string;
    checksum: string;
    version: string;
    name: string;
}

export interface CLIVersionManifest {
    templates: Record<string, TemplateManifest>;
    dependencies: Record<string, string>;
    version: string;
}
