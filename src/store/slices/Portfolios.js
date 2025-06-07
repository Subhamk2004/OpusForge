"use client";
import Portfolio from "@/components/other/Portfolio";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portfolios: [],
};

const portfoliosSlice = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    addPortfolio: (state, action) => {
      state.portfolios.push(action.payload);
    },
    updatePortfolio: (state, action) => {
      const index = state.portfolios.findIndex(
        (portfolio) => portfolio._id === action.payload._id
      );
      if (index !== -1) {
        state.portfolios[index] = action.payload;
      }
    },
    deletePortfolio: (state, action) => {
      state.portfolios = state.portfolios.filter(
        (portfolio) => portfolio._id !== action.payload
      );
    },
    setPortfolios: (state, action) => {
      state.portfolios = action.payload;
    },
  },
});
export const { addPortfolio, updatePortfolio, deletePortfolio, setPortfolios } =
  portfoliosSlice.actions;
export default portfoliosSlice.reducer;
