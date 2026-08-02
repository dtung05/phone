import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productDetail: builder.query({
      query: (slug) => ({
        url: `product/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useProductDetailQuery } = productApi;
