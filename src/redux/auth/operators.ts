import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../store';
import { IAuthState, IUser } from '../../helper/Auth.types';

// import { setupAxiosInterceptors } from '../../helper/axiosInterceptr';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;
// axios.defaults.baseURL = 'https://recursive-todo-api-1.onrender.com/api'

interface ILoginRes extends Pick<IAuthState, 'user' | 'accessToken'> {}

interface IRegData extends Pick<IUser, 'name' | 'email'> {
  password: string;
}

interface ILoginData extends Pick<IRegData, 'password' | 'email'> {}

interface IPasswordSet {
  oldPassword: string;
  newPassword?: string;
}

const setAuthHeader = (accessToken: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
// console.log(store.getState());

export const register = createAsyncThunk<
  IUser,
  IRegData,
  { rejectValue: string }
>('auth/register', async (creds, thunkAPI) => {
  try {
    const response = await axios.post('/users/register', creds);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const login = createAsyncThunk<
  ILoginRes,
  ILoginData,
  { rejectValue: string }
>('auth/login', async (creds, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', creds, {
      withCredentials: true,
    });
    setAuthHeader(response.data.accessToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout', {
        withCredentials: true,
        credentials: 'include',
      });

      Cookies.remove('refreshToken');
      clearAuthHeader();
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const persistedToken = state.auth.accessToken;
  if (!persistedToken) {
    return thunkAPI.rejectWithValue('Unable to find user');
  }

  try {
    setAuthHeader(persistedToken);
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Unable to find user';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const regenerateTokens = createAsyncThunk(
  'auth/regenerate',
  async (_, thunkAPI) => {
    try {
      
      const response = await axios.patch(
        'users/regenerate', {},{
          withCredentials: true,
        }
      );
      
      setAuthHeader(response.data.accessToken);
      return { user:response.data.user, accessToken: response.data.accessToken };
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// <string, void, {rejectValue: string}>
// <{ message: string }>

export const resendVerify = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>('auth/verify', async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const email = state.auth.user?.email;

  if (!email) {
    return thunkApi.rejectWithValue('Unable to find user');
  }
  try {
    const responce = await axios.post('/users/verify', { email });
    return responce?.data?.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Unable to find user';
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
});

export const updatePassword = createAsyncThunk<
  string,
  IPasswordSet,
  { rejectValue: string }
>('auth/update', async (newData: IPasswordSet, thunkAPI) => {
  try {
    const responce = await axios.patch('/users/update', newData);
    return responce.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const updateAvatar = createAsyncThunk<
  string,
  FormData,
  { rejectValue: string }
>('auth/avatar', async (formData, thunkAPI) => {
  try {
    const responce = await axios.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responce.data.newAvatar;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});



// const waitForStore = new Promise((resolve, reject) => {
//   // const checkStore = () => {
//   //     if (store) {
//   //       resolve(store);
//   //     } else {
//   //       setTimeout(checkStore, 50);
//   //     }
//   //   };
//   //   checkStore();
//   });

// waitForStore
//   .then((store) => {
//     setupAxiosInterceptors(store);
//     console.log("Ok");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// setupAxiosInterceptors();
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },

//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//       if (store){
//        store.dispatch(refreshUser());

//       }

//        return axios(originalRequest);

//       } catch (error) {
//         console.log("Error", error);
//         // return Promise.reject(error).then(async () => await refreshUser());
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export const refreshUser = createAsyncThunk<
//   IUser| {accessToken:string},
//   void,
//   { rejectValue: string }
// >('auth/refresh', async (_, thunkAPI) => {
//   const state = thunkAPI.getState() as RootState;
//   const persistedToken = state.auth.accessToken;

//   if (!persistedToken) {
//     try {
//       const  accessToken  = await regenerateTokens();
//       setAuthHeader(accessToken);
//       const response = await axios.get('/users/current');
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Unable to refresh tokens');
//     }
//   }

//   try {
//     setAuthHeader(persistedToken);
//     const response = await axios.get('/users/current');
//     return response.data;
//   } catch (error) {
//     regenerateTokens();
//     if (axios.isAxiosError(error)) {
//       const errorMessage =
//         error.response?.data?.message || 'Unable to find user';
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// });

// export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
//   'auth/logout',
//   async (_, thunkAPI) => {
//     try {
//       await axios.post('/users/logout', {
//         withCredentials: true,
//         credentials: 'include',
//       });
//       Cookies.remove('refreshToken');
//       clearAuthHeader();
//     } catch (error) {
//       if (axios.isAxiosError(error))
//         return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
