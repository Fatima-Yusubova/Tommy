import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("wishlist") || "[]");
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.includes(action.payload)) {
        const newState = [...state, action.payload];
        localStorage.setItem("wishlist", JSON.stringify(newState))
        return newState;
      }
      return state
    },
    removeFromWishlist: (state, action) => {
      const newState = state.filter((id) => id !== action.payload)
      localStorage.setItem("wishlist", JSON.stringify(newState))
      return newState;
    },
    clearWishlist: () => {
      localStorage.setItem("wishlist", JSON.stringify([]));
      return []
    }
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
