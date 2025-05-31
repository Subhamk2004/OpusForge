"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/User";
import templateReducer from "@/store/slices/Templates";

export const store = configureStore({
  reducer: {
    user: userReducer,
    templates: templateReducer,
  },
});
