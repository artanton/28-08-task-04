import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operators';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
interface IUser {
  email: string | null;
  name: string | null;
  avatarURL: string | null;
  verify: boolean;
}

export interface IAuthState {
  user: IUser;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState = {
  user: {
    email: null,
    name: null,
    avatarURL: null,
    verify: false,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload.user);
        Notify.success('Messege with verification code sent to your email. Verify your email please.');
      })
      .addCase (register.rejected, (state, action)=>{        
        Notify.failure(action.payload as string || 'Registration failed');
      })
 
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase (login.rejected, (state, action)=>{        
        Notify.failure(action.payload as string || 'Login failed');
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null, avatarURL: null, verify:false };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action)  => {
        state.isRefreshing = false;
        Notify.failure(action.payload as string || 'Unable to find user');
      });
  },
});

export const authReducer = authSlice.reducer;
