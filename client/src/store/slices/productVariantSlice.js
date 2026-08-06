import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productVariant: [],
};

const productVariantSlice = createSlice({
  name: "productVariant",
  initialState,
  reducers: {
    addProductVariant: (state, action) => {
      state.productVariant = action.payload;
    },

    removeProductVariant: (state) => {
      state.productVariant = [];
    },
  },
});

export const { addProductVariant, removeProductVariant } =
  productVariantSlice.actions;

export default productVariantSlice.reducer;
