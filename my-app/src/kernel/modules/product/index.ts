import { createHttp } from '@shared_kernel/infrastructure/http';

import type {
    CreateProductUseCase,
    UpdateProductUseCase,
    GetProductsUseCase,
    GetProductUseCase,
    CreateProductDto,
    UpdateProductDto,
    ProductCategory,
    ProductDto,
} from './application';
import type { ProductDeps } from './product.context';
import { ProductEndpoints, createProductContext as createBaseProductContext } from './product.context';

export { ProductEndpoints };
export type { ProductCategory };
export type { CreateProductDto, UpdateProductDto, ProductDto };

export interface ProductContext {
    readonly createProduct: CreateProductUseCase;
    readonly updateProduct: UpdateProductUseCase;
    readonly getProducts: GetProductsUseCase;
    readonly getProduct: GetProductUseCase;
}

export function createProductContext(overrides?: Partial<ProductDeps>): ProductContext {
    const container: ProductDeps = {
        http: overrides?.http ?? createHttp(ProductEndpoints),
    };
    return createBaseProductContext(container);
}
