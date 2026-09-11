import baseApi from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getTrashedCategories: builder.query({
      query: () => ({
        url: "categories/trashed",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories", "Products"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories", "Products"],
    }),
    restoreCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}/restore`,
        method: "POST",
      }),
      invalidatesTags: ["Categories", "Products"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetTrashedCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
} = categoryApi;

export default categoryApi;
