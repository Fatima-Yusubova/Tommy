import { configureStore } from "@reduxjs/toolkit";
import {eccomerceApi } from "./eccomerceApi";
export const store = configureStore({
  reducer: {
    [eccomerceApi.reducerPath]: eccomerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eccomerceApi.middleware),
});
