export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemDto {
  readonly productId: string;
  readonly quantity: number;
  readonly unitPrice: number;
}

export interface CreateOrderDto {
  readonly customerId: string;
  readonly items: readonly {
    readonly productId: string;
    readonly quantity: number;
    readonly unitPrice: number;
  }[];
}

export interface UpdateOrderStatusDto {
  readonly id: string;
  readonly status: OrderStatus;
}

export interface OrderDto {
  readonly items: readonly OrderItemDto[];
  readonly status: OrderStatus;
  readonly totalAmount: number;
  readonly customerId: string;
  readonly createdAt: string;
  readonly id: string;
}
