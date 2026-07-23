import { createProductContext } from '@core/product';
import { useMemo } from 'react';

import { useQuery } from '../../shared';

function useProductServices() {
  return useMemo(() => createProductContext(), []);
}

export function useGetProducts() {
  const { getProducts } = useProductServices();
  return useQuery(() => getProducts.execute(), { cacheKey: 'products', refetchInterval: 30_000 });
}
