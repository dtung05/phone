import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productList: builder.query({
      query: () => ({
        url: `products`,
        method: "GET",
      }),
    }),
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
    getProductsByBrand: builder.query({
      query: ({ brand, page }) => ({
        url: `brands/${brand}/products?page=${page}`,
        method: "GET",
      }),
    }),
    getProductsSale: builder.query({
      query: () => ({
        url: "products/sale",
        method: "GET",
      }),
    }),
    getProductsNew: builder.query({
      query: ({page}) => ({
        url: `products/new?page=${page}`,
      }),
    }),
  }),
});

export const {
  useProductListQuery,
  useProductDetailQuery,
  useProductSearchQuery,
  useGetProductsByBrandQuery,
  useGetProductsSaleQuery,
  useGetProductsNewQuery,
} = productApi;
