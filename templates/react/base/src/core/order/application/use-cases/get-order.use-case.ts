import type { IOrderRepository } from 'src/core/order/domain';
import type { OrderDto } from '../../domain/order.dto';

export class GetOrderUseCase {
    constructor(private readonly repository: IOrderRepository) {}

    public async execute(id: string): Promise<OrderDto> {
        return this.repository.findById(id);
    }
}

export class GetOrdersUseCase {
    constructor(private readonly repository: IOrderRepository) {}

    public async execute(): Promise<OrderDto[]> {
        return this.repository.findAll();
    }
}
