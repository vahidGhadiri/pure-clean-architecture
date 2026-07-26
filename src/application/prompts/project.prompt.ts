import { text } from '@clack/prompts';

interface ProjectPromptDefaults {
  defaultPath?: string;
  defaultName?: string;
}

export async function projectPrompt(defaults?: ProjectPromptDefaults) {
  const projectName = await text({
    validate(value) {
      if (value !== undefined) {
        if (!value.trim()) {
          return 'Project name is required';
        }
      }

      return undefined;
    },
    defaultValue: defaults?.defaultName ?? 'my-app',
    placeholder: defaults?.defaultName ?? 'my-app',
    message: 'What is your project name?',
  });

  const targetDirectory = await text({
    placeholder: defaults?.defaultName ? `./${defaults.defaultName}` : './my-app',
    message: 'Where should we create the project?',
    defaultValue: defaults?.defaultPath ?? './',
  });

  return {
    targetDirectory,
    projectName,
  };
}
