import baseApi from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: "checkout",
        method: "POST",
        body: data,
      }),
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "orders",
        method: "POST",
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: ({ status, page }) => ({
        url: `orders?status=${status}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCheckoutMutation, useAddOrderMutation, useGetOrdersQuery } =
  orderApi;
