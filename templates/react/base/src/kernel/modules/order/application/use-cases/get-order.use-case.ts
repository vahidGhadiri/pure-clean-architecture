import type { OrderDto, OrderStatus } from '../../domain/order.dto';
import type { IOrderRepository } from '../../domain';

export class GetOrderUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  public async execute(id: string): Promise<OrderDto> {
    return this.repository.findById({ pathParams: { id } });
  }
}

export class GetOrdersUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  public async execute(): Promise<OrderDto[]> {
    return this.repository.findAll();
  }
}

export class GetOrdersByCustomerUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  public async execute(customerId: string): Promise<OrderDto[]> {
    return this.repository.findByCustomerId({ pathParams: { customerId } });
  }
}

export class GetOrdersByStatusUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  public async execute(status: OrderStatus): Promise<OrderDto[]> {
    return this.repository.findByStatus({ pathParams: { status } });
  }
}
