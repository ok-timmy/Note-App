import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;
      state.user = email;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const setCurrentUser = (state) => state.auth.user;
export const setCurrentToken = (state) => state.auth.token;
