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
      query: ({ page }) => ({
        url: `products/new?page=${page}`,
      }),
      providesTags: ["Products"],
    }),
    // API Nhân viên
    getStaffProducts: builder.query({
      query: ({
        search = "",
        category_id = "",
        brand_id = "",
        page = 1,
      } = {}) => ({
        url: `staff/products?search=${encodeURIComponent(search)}&category_id=${category_id}&brand_id=${brand_id}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "staff/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `staff/products/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
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
  useGetStaffProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
