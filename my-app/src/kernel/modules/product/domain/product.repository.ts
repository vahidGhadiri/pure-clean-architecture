import type { ProductCategory, ProductDto } from './product.dto';

export interface CreateProductData {
    readonly category: ProductCategory;
    readonly price: number;
    readonly name: string;
}

export interface UpdateProductData {
    readonly category?: ProductCategory;
    readonly price?: number;
    readonly name?: string;
}

export interface IProductRepository {
    create(
        data: {
            id: string;
        } & CreateProductData
    ): Promise<ProductDto>;
    update(id: string, data: UpdateProductData): Promise<ProductDto>;
    findById(id: string): Promise<ProductDto>;
    delete(id: string): Promise<void>;
    findAll(): Promise<ProductDto[]>;
}
