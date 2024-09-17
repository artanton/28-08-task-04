import { createAsyncThunk } from '@reduxjs/toolkit';
import axios  from 'axios';
import { RootState } from '../store';
import { IAuthState, IUser } from './AuthSlice';



// import { ITask } from '../../Pages/mainPage/Task.types';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = 'https://recursive-todo-api.onrender.com/api'; //node-mongoDB
// axios.defaults.baseURL = 'https://recusive-todolist-nest-mongo.onrender.com'; //nest-mongose-mongoDB

// axios.defaults.baseURL = 'https://recurcieve-todolist-nest-typeorm-api.onrender.com'; //nest-typeORM-mongoDB
// axios.defaults.baseURL = 'https://recurcieve-todo-nest-prisma-mongo.onrender.com'; //nest-prisma-mongoDB

// type Ierror<AxiosError>


interface ILoginRes extends Pick<IAuthState, 'user'|'token'>{};

interface IRegData extends Pick <IUser,'name'|'email'>{
  password : string;
};

interface ILoginData extends Pick<IRegData, 'password'|'email'>{};

const setAuthHeader =( token:string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};


export const register = createAsyncThunk< IUser, IRegData,{rejectValue:string} >(
  'auth/register',
  async (creds, thunkAPI) => {
    try {
      const response = await axios.post('/users/register', creds);
      

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)){
      const errorMessage = error.response?.data?.message  || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);}

    }
  }
);



export const login = createAsyncThunk<ILoginRes, ILoginData,{rejectValue:string} >(
  'auth/login', async (creds, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', creds);
    
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
    const errorMessage = error.response?.data?.message || 'Login failed';
      return thunkAPI.rejectWithValue(errorMessage);}
  }
});

export const logout = createAsyncThunk<void,void,{rejectValue:string}>(
  'auth/logout', 
  async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    if(axios.isAxiosError(error))
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk<IUser, void, {rejectValue: string}>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to find user');
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      if(axios.isAxiosError(error)){
      const errorMessage = error.response?.data?.message || 'Unable to find user';
      return thunkAPI.rejectWithValue(errorMessage);
    }}
  }
);

// export const resendVerify = createAsyncThunk (
//   "auth/verify",
//   async (creds, thunkApi)=>{

//   }
// )
