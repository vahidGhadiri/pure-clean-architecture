import type { CreateOrderDto, OrderDto } from '@core/order';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createOrderContext } from '@core/order';

function getServices() {
    return createOrderContext();
}

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrders: builder.query<OrderDto[], void>({
            queryFn: async () => {
                const { getOrders } = getServices();
                const data = await getOrders.execute();
                return { data };
            },
            providesTags: ['Order'],
        }),
        createOrder: builder.mutation<OrderDto, CreateOrderDto>({
            queryFn: async (dto) => {
                const { createOrder } = getServices();
                const data = await createOrder.execute(dto);
                return { data };
            },
            invalidatesTags: ['Order'],
        }),
    }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;
