import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { CreateOrderDto, OrderDto } from '@modules/order';

import { useOrderContext } from '../..';

const ORDER_QUERY_KEY = ['orders'];

export function useCreateOrder() {
    const queryClient = useQueryClient();
    const { createOrder } = useOrderContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
        },
        mutationFn: (dto: CreateOrderDto): Promise<OrderDto> => createOrder.execute(dto),
    });
}
