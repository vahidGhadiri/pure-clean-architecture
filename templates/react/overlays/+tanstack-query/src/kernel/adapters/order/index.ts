import { createOrderEntrypoint } from '@modules/order';
import type { OrderContext } from '@modules/order';
import { useMemo } from 'react';

export function useOrderBoundedContext(): OrderContext {
  return useMemo(() => createOrderEntrypoint(), []);
}
