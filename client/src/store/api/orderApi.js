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

    // Dành cho Staff và Admin
    getStaffOrders: builder.query({
      query: ({
        search = "",
        order_status = "",
        payment_status = "",
        page = 1,
        per_page = 10,
      } = {}) => ({
        url: `staff/orders?search=${encodeURIComponent(search)}&order_status=${encodeURIComponent(order_status)}&payment_status=${encodeURIComponent(payment_status)}&page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getStaffOrderDetail: builder.query({
      query: (id) => ({
        url: `staff/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    updateStaffOrderStatus: builder.mutation({
      query: ({ id, order_status, payment_status }) => ({
        url: `staff/orders/${id}/status`,
        method: "PUT",
        body: { order_status, payment_status },
      }),
      invalidatesTags: ["Orders", "Products"],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useAddOrderMutation,
  useGetOrdersQuery,
  useCancelOrderMutation,
  useGetStaffOrdersQuery,
  useGetStaffOrderDetailQuery,
  useUpdateStaffOrderStatusMutation,
} = orderApi;

export default orderApi;
