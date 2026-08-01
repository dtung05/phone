import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import toastSlice from "./slices/toastSlice";
import baseApi from "./api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
