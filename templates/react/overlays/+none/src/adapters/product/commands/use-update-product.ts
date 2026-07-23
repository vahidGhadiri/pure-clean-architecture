import type { UpdateProductDto, ProductDto } from '@core/product';
import { createProductContext } from '@core/product';
import { useMemo } from 'react';

import { useMutation } from '../../shared';

function useProductServices() {
  return useMemo(() => createProductContext(), []);
}

export function useUpdateProduct() {
  const { updateProduct } = useProductServices();
  return useMutation<UpdateProductDto, ProductDto>((dto) => updateProduct.execute(dto));
}
