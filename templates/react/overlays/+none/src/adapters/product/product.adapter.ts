import type { CreateProductDto, UpdateProductDto, ProductDto } from '@core/product';
import { createProductContext } from '@core/product';
import { useCallback, useEffect, useMemo, useState } from 'react';

function useProductContext() {
    return useMemo(() => createProductContext(), []);
}

export function useProducts() {
    const { getProducts } = useProductContext();
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = async () => {
        setIsLoading(true);
        try {
            const data = await getProducts.execute();
            setProducts(data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void refetch();
    }, [getProducts]);

    return { products, isLoading, refetch, error };
}

export function useCreateProduct() {
    const { createProduct } = useProductContext();
    const [loading, setLoading] = useState(false);

    const execute = useCallback(
        async (dto: CreateProductDto): Promise<ProductDto> => {
            setLoading(true);
            try {
                return await createProduct.execute(dto);
            } finally {
                setLoading(false);
            }
        },
        [createProduct]
    );

    return { execute, loading };
}

export function useUpdateProduct() {
    const { updateProduct } = useProductContext();
    const [loading, setLoading] = useState(false);

    const execute = useCallback(
        async (dto: UpdateProductDto): Promise<ProductDto> => {
            setLoading(true);
            try {
                return await updateProduct.execute(dto);
            } finally {
                setLoading(false);
            }
        },
        [updateProduct]
    );

    return { execute, loading };
}
