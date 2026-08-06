import baseApi from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: "checkout/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCheckoutMutation } = orderApi;
