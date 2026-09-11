import baseApi from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "brands",
        method: "GET",
      }),
      providesTags: ["Brands"],
    }),
    getTrashedBrands: builder.query({
      query: () => ({
        url: "brands/trashed",
        method: "GET",
      }),
      providesTags: ["Brands"],
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brands", "Products"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands", "Products"],
    }),
    restoreBrand: builder.mutation({
      query: (id) => ({
        url: `brands/${id}/restore`,
        method: "POST",
      }),
      invalidatesTags: ["Brands", "Products"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetTrashedBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useRestoreBrandMutation,
} = brandApi;

export default brandApi;
