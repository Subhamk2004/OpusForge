"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
        // console.log(action.payload);
        state.user = action.payload;
        state.isAuthenticated = true;
    },
  },
});

export const {loginUser} = userSlice.actions;
export default userSlice.reducer;