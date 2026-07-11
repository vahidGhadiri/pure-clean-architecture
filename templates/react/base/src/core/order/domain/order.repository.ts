import type { OrderItem, OrderDto } from './order.dto';

export interface CreateOrderData {
    readonly customerName: string;
    readonly items: OrderItem[];
}

export interface IOrderRepository {
    create(
        data: {
            id: string;
        } & CreateOrderData
    ): Promise<OrderDto>;
    findById(id: string): Promise<OrderDto>;
    delete(id: string): Promise<void>;
    findAll(): Promise<OrderDto[]>;
}
