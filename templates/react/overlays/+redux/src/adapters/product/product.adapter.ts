import type { CreateProductDto, UpdateProductDto, ProductDto } from '@core/product';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createProductContext } from '@core/product';

function getServices() {
    return createProductContext();
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductDto[], void>({
            queryFn: async () => {
                const { getProducts } = getServices();
                const data = await getProducts.execute();
                return { data };
            },
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<ProductDto, CreateProductDto>({
            queryFn: async (dto) => {
                const { createProduct } = getServices();
                const data = await createProduct.execute(dto);
                return { data };
            },
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<ProductDto, UpdateProductDto>({
            queryFn: async (dto) => {
                const { updateProduct } = getServices();
                const data = await updateProduct.execute(dto);
                return { data };
            },
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation } = productApi;
