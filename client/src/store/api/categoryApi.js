import baseApi from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "categories",
        method: "get",
      }),
    }),
  }),
});
export const { useGetCategoryQuery } = categoryApi;
