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
  }),
});

export const { useProductDetailQuery } = productApi;
