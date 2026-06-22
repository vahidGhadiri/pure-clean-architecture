import type { CreateAccountDto, UpdateAccountDto, AccountDto } from '@core/account';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAccountContext } from '@core/account';

function getServices() {
    return createAccountContext();
}

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        getAccounts: builder.query<AccountDto[], void>({
            queryFn: async () => {
                const { getAccounts } = getServices();
                const data = await getAccounts.execute();
                return { data };
            },
            providesTags: ['Account'],
        }),
        createAccount: builder.mutation<AccountDto, CreateAccountDto>({
            queryFn: async (dto) => {
                const { createAccount } = getServices();
                const data = await createAccount.execute(dto);
                return { data };
            },
            invalidatesTags: ['Account'],
        }),
        updateAccount: builder.mutation<AccountDto, UpdateAccountDto>({
            queryFn: async (dto) => {
                const { updateAccount } = getServices();
                const data = await updateAccount.execute(dto);
                return { data };
            },
            invalidatesTags: ['Account'],
        }),
    }),
});

export const { useGetAccountsQuery, useCreateAccountMutation, useUpdateAccountMutation } = accountApi;
