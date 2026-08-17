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
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: ({ status, page }) => ({
        url: `orders?status=${status}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useAddOrderMutation,
  useGetOrdersQuery,
  useCancelOrderMutation,
} = orderApi;
