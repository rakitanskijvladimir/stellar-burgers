import {
  checkUserAuth,
  registerUser,
  updateUser,
  forgotPassword,
  loginUser,
  logoutUser
} from './sliceApi';
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TInitialState = {
  isLoading: boolean;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  registerError: string | null;
  checkAuthError: string | null;
  logoutError: string | null;
  updateUserError: string | null;
  forgotPasswordError: string | null;
  userData: TUser | null;

  loginError: string | null;
};

const initialState: TInitialState = {
  loginError: null,
  registerError: null,
  checkAuthError: null,
  isAuthChecked: false,
  isAuthenticated: false,
  logoutError: null,
  updateUserError: null,
  forgotPasswordError: null,
  userData: null,
  isLoading: false
};

const clientApiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectPasswordResetError: (state) => state.forgotPasswordError,
    selectUserLoadingStatus: (state) => state.isLoading,
    selectAuthStatusChecked: (state) => state.isAuthChecked,
    selectIsUserAuthenticated: (state) => state.isAuthenticated,
    selectRegisterError: (state) => state.registerError,
    selectAuthCheckError: (state) => state.checkAuthError,
    selectUserData: (state) => state.userData,

    selectLoginError: (state) => state.loginError,
    selectUserUpdateError: (state) => state.updateUserError
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.registerError =
          action.error.message || 'Не удалось зарегистрироваться';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.loginError = action.error.message || 'Не удалось войти в аккаунт';
      })

      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.checkAuthError =
          action.error.message ||
          'Ошибка проверки авторизованности пользователя';
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.logoutError =
          action.error.message || 'Не удалось выйти из аккаунта';
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.checkAuthError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.forgotPasswordError =
          action.error.message || 'Не удалось восстановить пароль';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.updateUserError =
          action.error.message || 'Не удалось обновить данные пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      });
  }
});

export const {
  selectAuthStatusChecked,
  selectUserData,
  selectIsUserAuthenticated,
  selectRegisterError,
  selectAuthCheckError,
  selectUserUpdateError,
  selectPasswordResetError,
  selectUserLoadingStatus,
  selectLoginError
} = clientApiSlice.selectors;
export const userReducer = clientApiSlice.reducer;
