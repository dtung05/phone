import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import toastSlice from "./slices/toastSlice";
import baseApi from "./api/baseApi";
import productVariantSlice from "./slices/productVariantSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    productVariant: productVariantSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
