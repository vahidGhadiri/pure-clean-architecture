import { v4 as uuidv4 } from 'uuid';

import type { CreateProductDto, ProductDto } from '../../domain/product.dto';
import type { IProductRepository } from 'src/core/product/domain';

export class CreateProductUseCase {
    constructor(private readonly repository: IProductRepository) {}

    public async execute(dto: CreateProductDto): Promise<ProductDto> {
        return this.repository.create({
            category: dto.category,
            price: dto.price,
            name: dto.name,
            id: uuidv4(),
        });
    }
}
