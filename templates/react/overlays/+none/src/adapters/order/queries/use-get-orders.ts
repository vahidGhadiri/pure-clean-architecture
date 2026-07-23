import { createOrderContext } from '@core/order';
import { useMemo } from 'react';

import { useQuery } from '../../shared';

function useOrderServices() {
  return useMemo(() => createOrderContext(), []);
}

export function useGetOrders() {
  const { getOrders } = useOrderServices();
  return useQuery(() => getOrders.execute(), { cacheKey: 'orders', refetchInterval: 30_000 });
}
