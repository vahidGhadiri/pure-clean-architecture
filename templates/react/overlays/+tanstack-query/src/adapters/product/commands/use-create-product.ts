import type { CreateProductDto, ProductDto } from '@core/product';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useProductContext } from '../..';

const PRODUCT_QUERY_KEY = ['products'];

export function useCreateProduct() {
    const queryClient = useQueryClient();
    const { createProduct } = useProductContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
        },
        mutationFn: (dto: CreateProductDto): Promise<ProductDto> => createProduct.execute(dto),
    });
}
