import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// import { ITask } from '../../Pages/mainPage/Task.types';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = 'https://recursive-todo-api.onrender.com/api'; //node-mongoDB
// axios.defaults.baseURL = 'https://recusive-todolist-nest-mongo.onrender.com'; //nest-mongose-mongoDB

// axios.defaults.baseURL = 'https://recurcieve-todolist-nest-typeorm-api.onrender.com'; //nest-typeORM-mongoDB
// axios.defaults.baseURL = 'https://recurcieve-todo-nest-prisma-mongo.onrender.com'; //nest-prisma-mongoDB

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (creds, thunkAPI) => {
    try {
      const response = await axios.post('/users/register', creds);

      return response.data;
    } catch (error) {
      
      const errorMessage = error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);

    }
  }
);

export const login = createAsyncThunk('auth/login', async (creds, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', creds);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
      return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to find user');
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unable to find user';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
