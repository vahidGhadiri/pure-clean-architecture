export type ProductEndpoints = typeof ProductEndpoints;

export const ProductEndpoints = {
    UPDATE_PRODUCT: '/api/products/:id',
    DELETE_PRODUCT: '/api/products/:id',
    GET_PRODUCT: '/api/products/:id',
    CREATE_PRODUCT: '/api/products',
    GET_PRODUCTS: '/api/products',
} as const;
