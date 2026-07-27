import { isCancel } from '@clack/prompts';

import type {
  DependencyCruiserRules,
  EslintStrictness,
  DevelopmentTool,
  PackageManager,
  ProjectOptions,
  CliFlags,
} from '../../domain/project.options.js';
import {
  dependencyCruiserConfigPrompt,
  packageManagerPrompt,
  eslintConfigPrompt,
  projectPrompt,
  toolsPrompt,
} from './index.js';

const VALID_MANAGERS: PackageManager[] = ['pnpm', 'yarn', 'npm'];
const VALID_TOOLS: DevelopmentTool[] = ['eslint', 'dependency-cruiser'];
const VALID_ESLINT: EslintStrictness[] = ['recommended', 'minimal', 'strict'];
const VALID_DEP_CRUISER: DependencyCruiserRules[] = ['minimal', 'recommended', 'strict'];

function validateEnum<T extends string>(value: string, valid: T[], label: string): T {
  if (!valid.includes(value as T)) {
    throw new Error(`Invalid ${label}: "${value}". Allowed: ${valid.join(', ')}`);
  }
  return value as T;
}

function parseTools(toolsStr: string): DevelopmentTool[] {
  const parts = toolsStr.split(',').map((t) => t.trim());
  return parts.map((t) => validateEnum(t, VALID_TOOLS, 'tool'));
}

export async function createProjectOptions(flags?: CliFlags): Promise<ProjectOptions> {
  let projectName: string;
  let targetDirectory: string;

  if (flags?.name && flags?.path) {
    projectName = flags.name;
    targetDirectory = flags.path;
  } else if (flags?.name || flags?.path) {
    const project = await projectPrompt({
      defaultName: flags.name,
      defaultPath: flags.path,
    });
    if (isCancel(project.projectName) || isCancel(project.targetDirectory)) {
      throw new Error('Project creation cancelled');
    }
    projectName = flags.name ?? project.projectName;
    targetDirectory = flags.path ?? project.targetDirectory;
  } else {
    const project = await projectPrompt();
    if (isCancel(project.projectName) || isCancel(project.targetDirectory)) {
      throw new Error('Project creation cancelled');
    }
    projectName = project.projectName;
    targetDirectory = project.targetDirectory;
  }

  let packageManager: PackageManager;
  if (flags?.manager) {
    packageManager = validateEnum(flags.manager, VALID_MANAGERS, 'package manager');
  } else {
    const pm = await packageManagerPrompt();
    if (isCancel(pm)) {
      throw new Error('Project creation cancelled');
    }
    packageManager = pm;
  }

  let tools: DevelopmentTool[];
  if (flags?.tools) {
    tools = parseTools(flags.tools);
  } else {
    const t = await toolsPrompt();
    if (isCancel(t)) {
      throw new Error('Project creation cancelled');
    }
    tools = t;
  }

  let eslintStrictness: ProjectOptions['eslintStrictness'];
  if (flags?.eslintStrictness) {
    eslintStrictness = validateEnum(flags.eslintStrictness, VALID_ESLINT, 'eslint strictness');
  } else if (tools.includes('eslint')) {
    const strictness = await eslintConfigPrompt();
    if (isCancel(strictness)) {
      throw new Error('Project creation cancelled');
    }
    eslintStrictness = strictness;
  }

  let dependencyCruiserRules: ProjectOptions['dependencyCruiserRules'];
  if (flags?.depCruiserRules) {
    dependencyCruiserRules = validateEnum(flags.depCruiserRules, VALID_DEP_CRUISER, 'dependency-cruiser rules');
  } else if (tools.includes('dependency-cruiser')) {
    const rules = await dependencyCruiserConfigPrompt();
    if (isCancel(rules)) {
      throw new Error('Project creation cancelled');
    }
    dependencyCruiserRules = rules;
  }

  return {
    stateManagement: 'tanstack-query',
    dependencyCruiserRules,
    eslintStrictness,
    targetDirectory,
    packageManager,
    projectName,
    tools,
  };
}
