"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
};
const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addAsset(state, action) {
      console.log("Adding asset:", action.payload);
      state.assets.push(action.payload);
    },
    removeAsset(state, action) {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload
      );
    },
  },
});
export const { addAsset, removeAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
