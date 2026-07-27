export type OrderEndpoints = typeof OrderEndpoints;

export const OrderEndpoints = {
  GET_ORDERS_BY_CUSTOMER: '/api/orders/customer/:customerId',
  GET_ORDERS_BY_STATUS: '/api/orders/status/:status',
  UPDATE_ORDER_STATUS: '/api/orders/:id/status',
  DELETE_ORDER: '/api/orders/:id',
  GET_ORDER: '/api/orders/:id',
  CREATE_ORDER: '/api/orders',
  GET_ORDERS: '/api/orders',
} as const;
