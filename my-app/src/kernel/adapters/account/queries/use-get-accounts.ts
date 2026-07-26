import type { AccountDto } from '@modules/account';
import { useQuery } from '@tanstack/react-query';

import { useAccountContext } from '../..';

const ACCOUNT_QUERY_KEY = ['accounts'];

export function useAccounts() {
    const { getAccounts } = useAccountContext();

    const { isLoading, refetch, error, data } = useQuery({
        queryFn: (): Promise<AccountDto[]> => getAccounts.execute(),
        queryKey: ACCOUNT_QUERY_KEY,
    });

    return { accounts: data ?? [], isLoading, refetch, error };
}
