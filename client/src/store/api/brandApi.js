import baseApi from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "brands",
        method: "get",
      }),
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
