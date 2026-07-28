export type PackageManager = 'pnpm' | 'yarn' | 'npm';

export type StateManagement = 'tanstack-query' | 'none';

export type DevelopmentTool = 'dependency-cruiser' | 'eslint';

export type EslintStrictness = 'recommended' | 'minimal' | 'strict';

export type DependencyCruiserRules = 'recommended' | 'minimal' | 'strict';

export type AuthRouting = 'protected' | 'none';

export interface ProjectOptions {
  dependencyCruiserRules?: DependencyCruiserRules;
  eslintStrictness?: EslintStrictness;
  stateManagement: StateManagement;
  packageManager: PackageManager;
  authRouting: AuthRouting;
  tools: DevelopmentTool[];
  targetDirectory: string;
  projectName: string;
}

export interface CliFlags {
  eslintStrictness?: string;
  depCruiserRules?: string;
  authRouting?: string;
  manager?: string;
  tools?: string;
  path?: string;
  name?: string;
}
