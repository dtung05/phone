import baseApi from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: "banners",
        method: "GET",
      }),
      providesTags: ["Banners"],
    }),
    getStaffBanners: builder.query({
      query: ({ search = "", position = "", is_active = "", page = 1 } = {}) => ({
        url: `staff/banners?search=${encodeURIComponent(search)}&position=${position}&is_active=${is_active}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Banners"],
    }),
    createBanner: builder.mutation({
      query: (formData) => ({
        url: "staff/banners",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banners"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `staff/banners/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banners"],
    }),
    toggleBannerActive: builder.mutation({
      query: (id) => ({
        url: `staff/banners/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: ["Banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `staff/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banners"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetStaffBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useToggleBannerActiveMutation,
  useDeleteBannerMutation,
} = bannerApi;
