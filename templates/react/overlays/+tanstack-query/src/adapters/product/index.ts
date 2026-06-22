import { createProductContext } from '@core/product';
import type { ProductContext } from '@core/product';
import { useMemo } from 'react';

export function useProductContext(): ProductContext {
    return useMemo(() => createProductContext(), []);
}
