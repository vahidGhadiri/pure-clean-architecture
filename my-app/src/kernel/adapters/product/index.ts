import { createProductContext } from '@modules/product';
import type { ProductContext } from '@modules/product';
import { useMemo } from 'react';

export function useProductContext(): ProductContext {
    return useMemo(() => createProductContext(), []);
}
