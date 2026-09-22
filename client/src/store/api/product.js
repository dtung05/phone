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
      providesTags: ["Products"],
    }),
    getProductsSalePaginated: builder.query({
      query: ({ page = 1, brand_id = "", category_id = "" } = {}) => ({
        url: `products/sale?page=${page}&brand_id=${brand_id}&category_id=${category_id}&per_page=12`,
        method: "GET",
      }),
      providesTags: ["Products"],
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
        is_sale = "",
        page = 1,
      } = {}) => ({
        url: `staff/products?search=${encodeURIComponent(search)}&category_id=${category_id}&brand_id=${brand_id}&is_sale=${is_sale}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getStaffProductDetail: builder.query({
      query: (id) => ({
        url: `staff/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products", "Reviews"],
    }),
    toggleProductSale: builder.mutation({
      query: (id) => ({
        url: `staff/products/${id}/toggle-sale`,
        method: "PATCH",
      }),
      invalidatesTags: ["Products"],
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
  useGetProductsSalePaginatedQuery,
  useGetProductsNewQuery,
  useGetStaffProductsQuery,
  useGetStaffProductDetailQuery,
  useToggleProductSaleMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
