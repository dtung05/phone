import baseApi from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: "banners",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBannersQuery } = bannerApi;
