import { createOrderContext } from '@core/order';
import type { OrderContext } from '@core/order';
import { useMemo } from 'react';

export function useOrderContext(): OrderContext {
    return useMemo(() => createOrderContext(), []);
}
