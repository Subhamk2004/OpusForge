"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: null,
};

const slightParsedTableSlice = createSlice({
  name: "slightParsedTableObj",
  initialState,
  reducers: {
    addTableObj(state, action) {
      if (JSON.stringify(state.table) !== JSON.stringify(action.payload)) {
        state.table = action.payload; 
      }
    },
  },
});

export const { addTableObj } = slightParsedTableSlice.actions;
export default slightParsedTableSlice.reducer;
