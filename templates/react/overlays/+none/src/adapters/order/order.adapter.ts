import type { CreateOrderDto, OrderDto } from '@core/order';
import { createOrderContext } from '@core/order';
import { useCallback, useEffect, useMemo, useState } from 'react';

function useOrderContext() {
    return useMemo(() => createOrderContext(), []);
}

export function useOrders() {
    const { getOrders } = useOrderContext();
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = async () => {
        setIsLoading(true);
        try {
            const data = await getOrders.execute();
            setOrders(data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void refetch();
    }, [getOrders]);

    return { orders, isLoading, refetch, error };
}

export function useCreateOrder() {
    const { createOrder } = useOrderContext();
    const [loading, setLoading] = useState(false);

    const execute = useCallback(
        async (dto: CreateOrderDto): Promise<OrderDto> => {
            setLoading(true);
            try {
                return await createOrder.execute(dto);
            } finally {
                setLoading(false);
            }
        },
        [createOrder]
    );

    return { execute, loading };
}
