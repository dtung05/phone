import baseApi from "./baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Thêm sản phẩm vào giỏ
    addCart: builder.mutation({
      query: (data) => ({
        url: "carts",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    // xem giỏ hàng
    getCart: builder.query({
      query: () => ({
        url: "carts",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    // Xóa giỏ hàng
    destroyCart: builder.mutation({
      query: (id) => ({
        url: `carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `carts/${id}`,
        method: "PUT",
        body: { quantity },
      }),
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useDestroyCartMutation,
  useUpdateCartMutation,
} = cartApi;
