import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import toastSlice from "./slices/toastSlice";
import profileSlice from "./slices/profileSlice";
import baseApi from "./api/baseApi";
import productVariantSlice from "./slices/productVariantSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    productVariant: productVariantSlice,
    profile : profileSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
