import { configureStore } from "@reduxjs/toolkit";
import { eccomerceApi } from "./eccomerceApi";
import wishlistReducer from "./wishlistSlice"; 

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, 
    [eccomerceApi.reducerPath]: eccomerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eccomerceApi.middleware),
});
