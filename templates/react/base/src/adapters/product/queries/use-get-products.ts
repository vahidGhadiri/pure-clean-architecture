import type { ProductDto } from '@modules/product';
import { useQuery } from '@tanstack/react-query';

import { useProductContext } from '../..';

const PRODUCT_QUERY_KEY = ['products'];

export function useProducts() {
    const { getProducts } = useProductContext();

    const { isLoading, refetch, error, data } = useQuery({
        queryFn: (): Promise<ProductDto[]> => getProducts.execute(),
        queryKey: PRODUCT_QUERY_KEY,
    });

    return { products: data ?? [], isLoading, refetch, error };
}
