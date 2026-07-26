import type { UpdateProductDto, ProductDto } from '@modules/product';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useProductContext } from '../..';

const PRODUCT_QUERY_KEY = ['products'];

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    const { updateProduct } = useProductContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
        },
        mutationFn: (dto: UpdateProductDto): Promise<ProductDto> => updateProduct.execute(dto),
    });
}
