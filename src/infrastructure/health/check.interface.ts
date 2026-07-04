export type CheckStatus = 'pass' | 'warn' | 'fail' | 'skip';

export interface CheckResult {
    status: CheckStatus;
    suggestion?: string;
    message: string;
    name: string;
}

export interface healthCheck {
    run(context: healthContext): Promise<CheckResult>;
    readonly description: string;
    readonly name: string;
}

export interface healthContext {
    projectPath?: string;
    nodeVersion: string;
}
