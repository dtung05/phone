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
    }),
  }),
});

export const { useAddCartMutation } = cartApi;
