import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productDetail: builder.query({
      query: (slug) => ({
        url: `products/${slug}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    productSearch: builder.query({
      query: ({ name, page }) => ({
        url: `products?search=${name}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useProductDetailQuery, useProductSearchQuery } = productApi;
