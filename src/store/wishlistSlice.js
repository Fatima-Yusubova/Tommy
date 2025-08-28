import { createSlice } from "@reduxjs/toolkit";

const getUserWishlist = (userId) => {
  return JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
};

const setUserWishlist = (userId, wishlist) => {
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    loadWishlist: (state, action) => {
      return getUserWishlist(action.payload) || [];
    },
    addToWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      if (!state.includes(productId)) {
        const newState = [...state, productId];
        setUserWishlist(userId, newState);
        return newState;
      }
      return state;
    },
    removeFromWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      const newState = state.filter((id) => id !== productId);
      setUserWishlist(userId, newState);
      return newState;
    },
    clearWishlist: (state, action) => {
      const userId = action.payload;
      setUserWishlist(userId, []);
      return [];
    },
    resetWishlist: () => {
      return [];
    },
  },
});

export const {
  loadWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  resetWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
