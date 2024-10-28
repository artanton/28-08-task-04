import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  refreshUser,
  regenerateTokens,
  register,
  resendVerify,
  updateAvatar,
  updatePassword,
} from './operators';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { IAuthState } from '../../helper/Auth.types';


export const initialState: IAuthState = {
  user: {
    email: null,
    name: null,
    avatarURL: null,
    verify: false,
  },
  
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  authError: null,
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(register.pending, (state, action) => {
      state.isRefreshing = true;
    })
      .addCase(register.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.authError = null;
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        Notify.success(
          'Verification code sent to your email. Verify your email to SignIn.'
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.isRefreshing = false;
        state.authError = action.payload as string;
        state.user.email = action.meta.arg.email as string;
        Notify.failure((action.payload as string) || 'Registration failed');
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.authError = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.authError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isRefreshing = false;
        state.authError = action.payload as string;
        state.user.email= action.meta.arg.email as string;
        Notify.failure((action.payload as string) || 'Login failed');
      })
      .addCase(logout.pending, state => {
        state.isRefreshing = true;
        
      })
      .addCase(logout.fulfilled, state => {
        state.isRefreshing = false;
        state.user = {
          name: null,
          email: null,
          avatarURL: null,
          verify: false,
        };
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.user.email= null;
        state.authError = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.authError = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.authError = action.payload as string;
        if (state.isLoggedIn)
          Notify.failure((action.payload as string) || 'Unable to find user');
        // state.isLoggedIn = false;
      })
      .addCase(regenerateTokens.pending, state => {
        state.isRefreshing = true;
        state.authError = null;
        state.isLoggedIn = false;
      })
      .addCase(regenerateTokens.fulfilled, (state, action:any) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(regenerateTokens.rejected, (state, action) => {
        state.isRefreshing = false;
        state.user= initialState.user;
        state.isLoggedIn = false;
        state.accessToken = null;
        if (state.isLoggedIn)
          Notify.failure((action.payload as string) || 'Unable to find user');
      })
    
      .addCase(resendVerify.fulfilled, (state, action) => {
        state.user.email= null;
        state.authError = null;
        Notify.success(
          'Verification code sent to your email. Verify your email to SignIn.'
        );
      })
      .addCase(resendVerify.rejected, (state, action) => {
        state.authError = action.payload as string;
        Notify.failure((action.payload as string) || 'Something went wrong');
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.authError = null;
        Notify.success(action.payload as string);
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.authError = action.payload as string;
        Notify.failure((action.payload as string) || 'Something went wrong');  
      })
      .addCase(updateAvatar.fulfilled, (state, action) => { 
        state.authError = null;
        state.user.avatarURL = action.payload 
        Notify.success("New photo upload success");
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.authError = action.payload as string;
        Notify.failure((action.payload as string) || 'Something went wrong');
      });

  },
});

export const authReducer = authSlice.reducer;



