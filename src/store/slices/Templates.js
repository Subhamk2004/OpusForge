"use client";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  templates: [],
};

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    addTemplate(state, action) {
      state.templates.push(action.payload);
    },
    removeTemplate(state, action) {
      state.templates = state.templates.filter(
        (template) => template.id !== action.payload
      );
    },
  },
});

export const { addTemplate, removeTemplate } = templatesSlice.actions;
export default templatesSlice.reducer;
