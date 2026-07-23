import { createAccountContext } from '@core/account';
import { useMemo } from 'react';

import { useQuery } from '../../shared';

function useAccountServices() {
  return useMemo(() => createAccountContext(), []);
}

export function useGetAccounts() {
  const { getAccounts } = useAccountServices();
  return useQuery(() => getAccounts.execute(), { cacheKey: 'accounts', refetchInterval: 30_000 });
}
