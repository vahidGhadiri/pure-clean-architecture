import type { UpdateOrderStatusDto, OrderDto } from '../../domain/order.dto';
import type { IOrderRepository } from '../../domain';

const VALID_TRANSITIONS: Record<string, readonly string[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};

export class UpdateOrderStatusUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  public async execute(dto: UpdateOrderStatusDto): Promise<OrderDto> {
    const order = await this.repository.findById({ pathParams: { id: dto.id } });
    const allowed = VALID_TRANSITIONS[order.status] ?? [];

    if (!allowed.includes(dto.status)) {
      throw new Error(`Cannot transition from ${order.status} to ${dto.status}`);
    }

    return this.repository.updateStatus({
      pathParams: { id: dto.id },
      body: { status: dto.status },
    });
  }
}
