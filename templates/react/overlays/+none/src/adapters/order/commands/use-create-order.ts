import type { CreateOrderDto, OrderDto } from '@core/order';
import { createOrderContext } from '@core/order';
import { useMemo } from 'react';

import { useMutation } from '../../shared';

function useOrderServices() {
  return useMemo(() => createOrderContext(), []);
}

export function useCreateOrder() {
  const { createOrder } = useOrderServices();
  return useMutation<CreateOrderDto, OrderDto>((dto) => createOrder.execute(dto));
}
