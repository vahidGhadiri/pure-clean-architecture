import { text } from '@clack/prompts';

export async function projectPrompt() {
    const projectName = await text({
        validate(value) {
            if (value !== undefined) {
                if (!value.trim()) {
                    return 'Project name is required';
                }
            }

            return undefined;
        },
        message: 'What is your project name?',
        defaultValue: 'my-app',
        placeholder: 'my-app',
    });

    const targetDirectory = await text({
        message: 'Where should we create the project?',
        placeholder: './my-app',
        defaultValue: './',
    });

    return {
        targetDirectory,
        projectName,
    };
}
