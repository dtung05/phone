import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ slug, ...body }) => ({
        url: `products/${slug}/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
    getReviews: builder.query({
      query: ({ slug, page = 1 }) => ({
        url: `products/${slug}/reviews?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `products/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});
export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;


