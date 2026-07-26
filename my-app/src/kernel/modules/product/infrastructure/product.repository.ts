import type { IHttp } from '@shared_kernel/contracts';

import type { IProductRepository, CreateProductData, UpdateProductData } from 'src/core/product/domain';
import type { ProductEndpoints } from './product.endpoints';
import type { ProductDto } from '../domain/product.dto';

export class ProductRepository implements IProductRepository {
    constructor(private readonly http: IHttp<typeof ProductEndpoints>) {}

    public async create(
        data: {
            id: string;
        } & CreateProductData
    ): Promise<ProductDto> {
        return this.http.request<'CREATE_PRODUCT', ProductDto>({
            body: {
                category: data.category,
                price: data.price,
                name: data.name,
            },
            endpoint: 'CREATE_PRODUCT',
            method: 'POST',
        });
    }

    public async update(id: string, data: UpdateProductData): Promise<ProductDto> {
        return this.http.request<'UPDATE_PRODUCT', ProductDto>({
            endpoint: 'UPDATE_PRODUCT',
            pathParams: { id },
            method: 'PATCH',
            body: data,
        });
    }

    public async findById(id: string): Promise<ProductDto> {
        return this.http.request<'GET_PRODUCT', ProductDto>({
            endpoint: 'GET_PRODUCT',
            pathParams: { id },
            method: 'GET',
        });
    }

    public async delete(id: string): Promise<void> {
        await this.http.request<'DELETE_PRODUCT', void>({
            endpoint: 'DELETE_PRODUCT',
            pathParams: { id },
            method: 'DELETE',
        });
    }

    public async findAll(): Promise<ProductDto[]> {
        return this.http.request<'GET_PRODUCTS', ProductDto[]>({
            endpoint: 'GET_PRODUCTS',
            method: 'GET',
        });
    }
}
