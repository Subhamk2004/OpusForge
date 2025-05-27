"use client"

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/User";

export const store = configureStore({
    reducer:{
        user: userReducer
    }
})

