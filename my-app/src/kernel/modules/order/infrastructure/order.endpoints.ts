export type OrderEndpoints = typeof OrderEndpoints;

export const OrderEndpoints = {
    DELETE_ORDER: '/api/orders/:id',
    GET_ORDER: '/api/orders/:id',
    CREATE_ORDER: '/api/orders',
    GET_ORDERS: '/api/orders',
} as const;
