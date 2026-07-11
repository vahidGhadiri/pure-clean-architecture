import { createHttp } from '@shared_kernel/infrastructure/http';

import type { CreateOrderUseCase, GetOrdersUseCase, GetOrderUseCase } from './application';
import type { OrderDeps } from './order.context';
import { OrderEndpoints } from './order.context';

export type { CreateOrderDto, OrderDto } from './application';
export { OrderEndpoints };

export interface OrderContext {
    readonly createOrder: CreateOrderUseCase;
    readonly getOrders: GetOrdersUseCase;
    readonly getOrder: GetOrderUseCase;
}

export function createOrderContext(overrides?: Partial<OrderDeps>): OrderContext {
    const container: OrderDeps = {
        http: overrides?.http ?? createHttp(OrderEndpoints),
    };
    return createOrderContext(container);
}
