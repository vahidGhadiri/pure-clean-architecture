import { isCancel, confirm } from '@clack/prompts';

export async function runDevPrompt(): Promise<boolean> {
  const result = await confirm({
    message: 'Do you want to run the project on port 3000?',
    initialValue: true,
  });

  if (isCancel(result)) return false;
  return result === true;
}
