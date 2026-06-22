import { isCancel, confirm } from '@clack/prompts';

export async function installDependenciesPrompt(): Promise<boolean> {
  const result = await confirm({
    message: 'Do you want to install dependencies now?',
    initialValue: true,
  });

  if (isCancel(result)) {
    return false;
  }

  return result === true;
}
