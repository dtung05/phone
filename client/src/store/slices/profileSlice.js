import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const profileSlice = createSlice({
    name: "profile",
    initialState,

    reducers: {
        setProfile: (state, action) => {
            return action.payload;
        },

        removeProfile: () => {
            return null;
        },
    },
});

export const { setProfile, removeProfile } = profileSlice.actions;

export default profileSlice.reducer;