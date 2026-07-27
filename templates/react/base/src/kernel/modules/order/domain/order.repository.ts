import type { OrderStatus, OrderDto } from './order.dto';

export interface CreateOrderData {
  readonly customerId: string;
  readonly items: readonly { readonly productId: string; readonly quantity: number; readonly unitPrice: number }[];
}

export interface IOrderRepository {
  updateStatus(params: { pathParams: { id: string }; body: { status: OrderStatus } }): Promise<OrderDto>;
  findByCustomerId(params: { pathParams: { customerId: string } }): Promise<OrderDto[]>;
  findByStatus(params: { pathParams: { status: OrderStatus } }): Promise<OrderDto[]>;
  findById(params: { pathParams: { id: string } }): Promise<OrderDto>;
  delete(params: { pathParams: { id: string } }): Promise<void>;
  create(params: { body: CreateOrderData }): Promise<OrderDto>;
  findAll(): Promise<OrderDto[]>;
}
