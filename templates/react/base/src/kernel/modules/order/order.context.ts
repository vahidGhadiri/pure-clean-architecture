import { createContext } from '@shared_kernel/composition';
import type { IHttp } from '@shared_kernel/contracts';

import { CreateOrderUseCase, GetOrdersUseCase, GetOrderUseCase } from './application';
import { OrderRepository, OrderEndpoints } from './infrastructure';

export { OrderEndpoints };

export interface OrderDeps {
    http: IHttp<typeof OrderEndpoints>;
}

export const createOrderContext = createContext<
    OrderDeps,
    OrderRepository,
    {
        createOrder: CreateOrderUseCase;
        getOrders: GetOrdersUseCase;
        getOrder: GetOrderUseCase;
    }
>({
    createServices: (repository) => ({
        createOrder: new CreateOrderUseCase(repository),
        getOrders: new GetOrdersUseCase(repository),
        getOrder: new GetOrderUseCase(repository),
    }),
    createRepository: ({ http }) => new OrderRepository(http),
});
