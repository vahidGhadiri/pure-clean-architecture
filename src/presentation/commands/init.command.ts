import { Command } from 'commander';

import { createInitHandler } from '../../composition/init.composer.js';
import { handleError } from '../../shared/errors/error.handler.js';

export const createInitCommand = () => {
    const command = new Command('init');

    command.description('Create a new pure clean project').action(async () => {
        try {
            const handler = createInitHandler();
            await handler.execute();
        } catch (error) {
            handleError(error);
        }
    });

    return command;
};
