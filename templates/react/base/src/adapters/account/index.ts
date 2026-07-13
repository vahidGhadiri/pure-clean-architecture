import { createAccountContext } from '@modules/account';
import type { AccountContext } from '@modules/account';
import { useMemo } from 'react';

export function useAccountContext(): AccountContext {
    return useMemo(() => createAccountContext(), []);
}
