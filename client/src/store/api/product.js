import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productDetail: builder.query({
      query: (slug) => ({
        url: `products/${slug}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useProductDetailQuery } = productApi;
