"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/User";
import templateReducer from "@/store/slices/Templates";
import assetReducer from "@/store/slices/Assets";
import portfolioReducer from "@/store/slices/Portfolios";

export const store = configureStore({
  reducer: {
    user: userReducer,
    templates: templateReducer,
    assets: assetReducer,
    portfolios: portfolioReducer,
  },
});
