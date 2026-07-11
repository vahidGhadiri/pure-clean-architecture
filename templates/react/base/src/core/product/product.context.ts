import { createContext } from '@shared_kernel/composition';
import type { IHttp } from '@shared_kernel/contracts';

import { CreateProductUseCase, UpdateProductUseCase, GetProductsUseCase, GetProductUseCase } from './application';
import { ProductRepository, ProductEndpoints } from './infrastructure';

export { ProductEndpoints };

export interface ProductDeps {
    http: IHttp<typeof ProductEndpoints>;
}

export const createProductContext = createContext<
    ProductDeps,
    ProductRepository,
    {
        updateProduct: UpdateProductUseCase;
        createProduct: CreateProductUseCase;
        getProducts: GetProductsUseCase;
        getProduct: GetProductUseCase;
    }
>({
    createServices: (repository) => ({
        createProduct: new CreateProductUseCase(repository),
        updateProduct: new UpdateProductUseCase(repository),
        getProducts: new GetProductsUseCase(repository),
        getProduct: new GetProductUseCase(repository),
    }),
    createRepository: ({ http }) => new ProductRepository(http),
});
