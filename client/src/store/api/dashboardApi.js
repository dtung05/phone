import baseApi from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: ({ start_date = "", end_date = "" } = {}) => {
        const params = new URLSearchParams();
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        const queryString = params.toString();
        return {
          url: `staff/dashboard${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard", "Orders"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useLazyGetDashboardStatsQuery } =
  dashboardApi;

export default dashboardApi;
