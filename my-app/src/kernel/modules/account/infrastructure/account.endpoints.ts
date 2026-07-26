export type AccountEndpoints = typeof AccountEndpoints;

export const AccountEndpoints = {
    UPDATE_ACCOUNT: '/api/accounts/:id',
    DELETE_ACCOUNT: '/api/accounts/:id',
    GET_ACCOUNT: '/api/accounts/:id',
    CREATE_ACCOUNT: '/api/accounts',
    GET_ACCOUNTS: '/api/accounts',
} as const;
