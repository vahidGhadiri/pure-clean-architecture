import { isCancel } from '@clack/prompts';

import {
  dependencyCruiserConfigPrompt,
  packageManagerPrompt,
  eslintConfigPrompt,
  projectPrompt,
  toolsPrompt,
} from './index.js';
import type { ProjectOptions } from '../../domain/project.options.js';

export async function createProjectOptions(): Promise<ProjectOptions> {
  const project = await projectPrompt();

  if (isCancel(project.projectName) || isCancel(project.targetDirectory)) {
    throw new Error('Project creation cancelled');
  }

  const packageManager = await packageManagerPrompt();

  if (isCancel(packageManager)) {
    throw new Error('Project creation cancelled');
  }

  const tools = await toolsPrompt();

  if (isCancel(tools)) {
    throw new Error('Project creation cancelled');
  }

  let eslintStrictness: ProjectOptions['eslintStrictness'];
  let dependencyCruiserRules: ProjectOptions['dependencyCruiserRules'];

  if (tools.includes('eslint')) {
    eslintStrictness = await eslintConfigPrompt();
    if (isCancel(eslintStrictness)) {
      throw new Error('Project creation cancelled');
    }
  }

  if (tools.includes('dependency-cruiser')) {
    dependencyCruiserRules = await dependencyCruiserConfigPrompt();
    if (isCancel(dependencyCruiserRules)) {
      throw new Error('Project creation cancelled');
    }
  }

  return {
    targetDirectory: project.targetDirectory,
    stateManagement: 'tanstack-query',
    projectName: project.projectName,
    dependencyCruiserRules,
    eslintStrictness,
    packageManager,
    tools,
  };
}
