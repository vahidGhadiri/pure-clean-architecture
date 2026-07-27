import type { UpdateOrderStatusDto, OrderDto } from '@modules/order';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useOrderBoundedContext } from '../..';

const ORDER_QUERY_KEY = ['orders'];

export function useUpdateOrderStatusCommand() {
    const queryClient = useQueryClient();
    const { updateOrderStatus } = useOrderBoundedContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
        },
        mutationFn: (dto: UpdateOrderStatusDto): Promise<OrderDto> => updateOrderStatus.execute(dto),
    });
}
