import { createSlice } from "@reduxjs/toolkit";
import { loadWishlist, clearWishlist } from "./wishlistSlice";
import { resetWishlist } from "./wishlistSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
    },
    signout: (state) => {
      state.user = null;
    },
  },
});
export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
export const loginUser = (userData) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(userData));
  dispatch(signin(userData.user));
  const wishlistKey = `wishlist_${userData.user.id}`;
  if (!localStorage.getItem(wishlistKey)) {
    localStorage.setItem(wishlistKey, JSON.stringify([]));
  }

  dispatch(loadWishlist(userData.user.id));
};

export const logoutUser = () => (dispatch, getState) => {
  const user = getState().auth.user;
  if (user) {
    dispatch(resetWishlist());
  }
  localStorage.removeItem("user");
  dispatch(signout());
};

