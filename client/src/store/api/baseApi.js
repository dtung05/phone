import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useNavigate } from "react-router-dom";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include", // cho phép gửi cookie kèm theoo
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Không cố gắng refresh token đối với các endpoint xác thực (login, register, refresh)
  const url = typeof args === "string" ? args : args?.url || "";
  const isAuthEndpoint =
    url.includes("login") ||
    url.includes("register") ||
    url.includes("refresh");

  if (result.error?.status === 401 && !isAuthEndpoint) {
    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      localStorage.setItem("access_token", refreshResult.data.access_token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
  }
  if (result.error?.status === 403) {
    window.location.href = "/403";
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Products",
    "Reviews",
    "Orders",
    "Cart",
    "Brands",
    "Categories",
    "Banners",
    "PurchaseReceipts",
    "Suppliers",
  ],
  endpoints: () => ({}),
});

export default baseApi;
