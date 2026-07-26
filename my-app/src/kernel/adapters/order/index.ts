import { createOrderContext } from '@modules/order';
import type { OrderContext } from '@modules/order';
import { useMemo } from 'react';

export function useOrderContext(): OrderContext {
    return useMemo(() => createOrderContext(), []);
}
