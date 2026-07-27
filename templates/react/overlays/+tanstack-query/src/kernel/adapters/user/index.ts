import { createUserEntrypoint } from '@modules/user';
import type { UserContext } from '@modules/user';
import { useMemo } from 'react';

export function useUserBoundedContext(): UserContext {
    return useMemo(() => createUserEntrypoint(), []);
}
