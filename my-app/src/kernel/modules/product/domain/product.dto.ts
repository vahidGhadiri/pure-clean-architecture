export type ProductCategory = 'ELECTRONICS' | 'CLOTHING' | 'BOOKS' | 'FOOD';

export interface CreateProductDto {
    readonly category: ProductCategory;
    readonly price: number;
    readonly name: string;
}

export interface UpdateProductDto {
    readonly category?: ProductCategory;
    readonly price?: number;
    readonly name?: string;
    readonly id: string;
}

export interface ProductDto {
    readonly category: ProductCategory;
    readonly price: number;
    readonly name: string;
    readonly id: string;
}
