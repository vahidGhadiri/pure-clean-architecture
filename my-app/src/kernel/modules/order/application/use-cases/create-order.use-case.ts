import { v4 as uuidv4 } from 'uuid';

import type { CreateOrderDto, OrderDto } from '../../domain/order.dto';
import type { IOrderRepository } from 'src/core/order/domain';

export class CreateOrderUseCase {
    constructor(private readonly repository: IOrderRepository) {}

    public async execute(dto: CreateOrderDto): Promise<OrderDto> {
        return this.repository.create({
            customerName: dto.customerName,
            items: dto.items,
            id: uuidv4(),
        });
    }
}
