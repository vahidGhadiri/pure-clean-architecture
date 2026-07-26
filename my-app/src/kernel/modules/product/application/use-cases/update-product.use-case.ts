import type { UpdateProductDto, ProductDto } from '../../domain/product.dto';
import type { IProductRepository } from 'src/core/product/domain';

export class UpdateProductUseCase {
    constructor(private readonly repository: IProductRepository) {}

    public async execute(dto: UpdateProductDto): Promise<ProductDto> {
        return this.repository.update(dto.id, {
            category: dto.category,
            price: dto.price,
            name: dto.name,
        });
    }
}
