import type { CreateOrderDto, OrderDto } from '@modules/order';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useOrderBoundedContext } from '../..';

const ORDER_QUERY_KEY = ['orders'];

export function useCreateOrderCommand() {
    const queryClient = useQueryClient();
    const { createOrder } = useOrderBoundedContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
        },
        mutationFn: (dto: CreateOrderDto): Promise<OrderDto> => createOrder.execute(dto),
    });
}
