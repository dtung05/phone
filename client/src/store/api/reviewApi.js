import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ slug, ...body }) => ({
        url: `products/${slug}/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews", "Products"],
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
      invalidatesTags: ["Reviews", "Products"],
    }),

    getStaffReviews: builder.query({
      query: ({
        status = "",
        rating = "",
        search = "",
        product_id = "",
        page = 1,
        per_page = 10,
      } = {}) => ({
        url: `staff/reviews?status=${status}&rating=${rating}&search=${encodeURIComponent(
          search
        )}&product_id=${product_id}&page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    getUnrepliedReviewsCount: builder.query({
      query: () => ({
        url: "staff/reviews/unreplied-count",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    replyReview: builder.mutation({
      query: ({ id, content }) => ({
        url: `staff/reviews/${id}/reply`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Reviews", "Products"],
    }),

    deleteStaffReview: builder.mutation({
      query: (id) => ({
        url: `staff/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews", "Products"],
    }),

    deleteStaffReviewReply: builder.mutation({
      query: (id) => ({
        url: `staff/reviews/replies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews", "Products"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
  useGetStaffReviewsQuery,
  useGetUnrepliedReviewsCountQuery,
  useReplyReviewMutation,
  useDeleteStaffReviewMutation,
  useDeleteStaffReviewReplyMutation,
} = reviewApi;
