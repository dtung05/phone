import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ slug, ...body }) => ({
        url: `products/${slug}/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    getReviews: builder.query({
      query: ({ slug, page = 1 }) => ({
        url: `products/${slug}/reviews?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
