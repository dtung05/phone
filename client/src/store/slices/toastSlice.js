import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || true;
    },
    hideToast: (state, action) => {
      state.message = null;
      state.type = null;
    },
  },
});
export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
