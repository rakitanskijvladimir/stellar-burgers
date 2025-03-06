import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  forgotPassword,
  getUserInfo,
  logIn,
  logOut,
  registrationUser,
  resetPassword,
  updateUserInfo,
} from "../../utils/universal-api";
import { TUser, TUserData, TUserWithTokens } from "../../utils/data-blueprint";

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TAuthState = {
  user: null,
  isAuthChecked: true,
};

export const fetchRegistration = createAsyncThunk(
  "registration/post",
  registrationUser
);

export const fetchLogIn = createAsyncThunk("login/post", logIn);

export const fetchLogOut = createAsyncThunk("logout/post", logOut);

export const fetchUserInfo = createAsyncThunk("userInfo/get", getUserInfo);

export const fetchUpdateUser = createAsyncThunk(
  "updateUser/patch",
  updateUserInfo
);

export const fetchForgotPass = createAsyncThunk(
  "forgotPass/post",
  forgotPassword
);

export const fetchResetPass = createAsyncThunk("resetPass/post", resetPassword);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(fetchLogIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(fetchLogOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.isAuthChecked = true;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.user = initialState.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.isAuthChecked = false;
      });
  },
});

export default authSlice.reducer;
