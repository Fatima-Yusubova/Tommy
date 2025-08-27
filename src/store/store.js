import { configureStore } from "@reduxjs/toolkit";
import { eccomerceApi } from "./eccomerceApi";
import wishlistReducer from "./wishlistSlice"; 
import authReducer from "./authslice";


export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, 
    auth :authReducer,
    [eccomerceApi.reducerPath]: eccomerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eccomerceApi.middleware),
});
