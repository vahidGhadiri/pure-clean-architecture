import type { IProductRepository } from 'src/core/product/domain';
import type { ProductDto } from '../../domain/product.dto';

export class GetProductUseCase {
    constructor(private readonly repository: IProductRepository) {}

    public async execute(id: string): Promise<ProductDto> {
        return this.repository.findById(id);
    }
}

export class GetProductsUseCase {
    constructor(private readonly repository: IProductRepository) {}

    public async execute(): Promise<ProductDto[]> {
        return this.repository.findAll();
    }
}
