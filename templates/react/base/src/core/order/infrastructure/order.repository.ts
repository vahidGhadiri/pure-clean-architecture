import type { IHttp } from '@shared_kernel/contracts';

import type { IOrderRepository, CreateOrderData } from 'src/core/order/domain';
import type { OrderEndpoints } from './order.endpoints';
import type { OrderDto } from '../domain/order.dto';

export class OrderRepository implements IOrderRepository {
    constructor(private readonly http: IHttp<typeof OrderEndpoints>) {}

    public async create(
        data: {
            id: string;
        } & CreateOrderData
    ): Promise<OrderDto> {
        return this.http.request<'CREATE_ORDER', OrderDto>({
            body: {
                customerName: data.customerName,
                items: data.items,
            },
            endpoint: 'CREATE_ORDER',
            method: 'POST',
        });
    }

    public async findById(id: string): Promise<OrderDto> {
        return this.http.request<'GET_ORDER', OrderDto>({
            endpoint: 'GET_ORDER',
            pathParams: { id },
            method: 'GET',
        });
    }

    public async delete(id: string): Promise<void> {
        await this.http.request<'DELETE_ORDER', void>({
            endpoint: 'DELETE_ORDER',
            pathParams: { id },
            method: 'DELETE',
        });
    }

    public async findAll(): Promise<OrderDto[]> {
        return this.http.request<'GET_ORDERS', OrderDto[]>({
            endpoint: 'GET_ORDERS',
            method: 'GET',
        });
    }
}
