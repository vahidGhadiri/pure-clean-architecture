import type { OrderDto } from '@modules/order';
import { useQuery } from '@tanstack/react-query';

import { useOrderBoundedContext } from '../..';

const ORDER_QUERY_KEY = ['orders'];

export function useGetOrdersQuery() {
    const { getOrders } = useOrderBoundedContext();

    const { isLoading, refetch, error, data } = useQuery({
        queryFn: (): Promise<OrderDto[]> => getOrders.execute(),
        queryKey: ORDER_QUERY_KEY,
    });

    return { orders: data ?? [], isLoading, refetch, error };
}
