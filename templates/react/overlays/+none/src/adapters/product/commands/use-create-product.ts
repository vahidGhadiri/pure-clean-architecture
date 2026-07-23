import type { CreateProductDto, ProductDto } from '@core/product';
import { createProductContext } from '@core/product';
import { useMemo } from 'react';

import { useMutation } from '../../shared';

function useProductServices() {
  return useMemo(() => createProductContext(), []);
}

export function useCreateProduct() {
  const { createProduct } = useProductServices();
  return useMutation<CreateProductDto, ProductDto>((dto) => createProduct.execute(dto));
}
