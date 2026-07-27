import type { CreateOrderDto, OrderDto } from '../../domain/order.dto';
import type { IOrderRepository } from '../../domain';

export class CreateOrderUseCase {
    constructor(private readonly repository: IOrderRepository) {}

    public async execute(dto: CreateOrderDto): Promise<OrderDto> {
        return this.repository.create({
            body: { customerId: dto.customerId, items: dto.items },
        });
    }
}
