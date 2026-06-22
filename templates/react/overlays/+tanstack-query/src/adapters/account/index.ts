import { createAccountContext } from '@core/account';
import type { AccountContext } from '@core/account';
import { useMemo } from 'react';

export function useAccountContext(): AccountContext {
    return useMemo(() => createAccountContext(), []);
}
