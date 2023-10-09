import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const token = Cookies.get("accessToken");

const initialState = {
  specializations: [],
  isLogged:
    !!token && (user ? user?.phone_number && user?.email_verified : false)
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    replaceSpecializations(state, action) {
      state.specializations = action.payload;
    },
    loginHandler(state, action) {
      state.isLogged = action.payload;
    },
    logoutHandler(state, action) {
      state.isLogged = false;
    }
  }
});

export default authSlice.reducer;
export const authAction = authSlice.actions;
