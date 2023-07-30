import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userId: null,
  userName: null,
  contactNo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, userId, contactNo } = action.payload;

      state.isLoggedIn = true;
      state.email = email;
      state.userId = userId;
      state.userName = userName;
      state.contactNo = contactNo;
    },

    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
      state.contactNo = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserId = (state) => state.auth.userId;
export const selectContactNo = (state) => state.auth.contactNo;

export default authSlice.reducer;
