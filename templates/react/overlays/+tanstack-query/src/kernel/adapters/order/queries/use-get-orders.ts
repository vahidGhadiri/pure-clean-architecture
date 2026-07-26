import { useQuery } from '@tanstack/react-query';
import type { OrderDto } from '@modules/order';

import { useOrderContext } from '../..';

const ORDER_QUERY_KEY = ['orders'];

export function useOrders() {
    const { getOrders } = useOrderContext();

    const { isLoading, refetch, error, data } = useQuery({
        queryFn: (): Promise<OrderDto[]> => getOrders.execute(),
        queryKey: ORDER_QUERY_KEY,
    });

    return { orders: data ?? [], isLoading, refetch, error };
}
