import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITask } from '../../helper/Task.types';


axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`
// axios.defaults.baseURL = 'https://recursive-todo-api-1.onrender.com/api'


// axios.defaults.baseURL = 'https://668c2ba00b61b8d23b0ca4de.mockapi.io';
// axios.defaults.baseURL = 'https://recursive-todo-api-1.onrender.com/api'; //node-mongoDB
// axios.defaults.baseURL = 'https://recusive-todolist-nest-mongo.onrender.com'; //nest-mongose-mongoDB


// axios.defaults.baseURL = 'https://recurcieve-todolist-nest-typeorm-api.onrender.com'; //nest-typeORM-mongoDB
// axios.defaults.baseURL = 'https://recurcieve-todo-nest-prisma-mongo.onrender.com'; //nest-prisma-mongoDB

export const fetchTasks = createAsyncThunk<ITask[]>(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/tasks');

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const addTask = createAsyncThunk<
  ITask,
  Partial<ITask>,
  { rejectValue: string }
>('tasks/addTask', async ({ text, date, parentId, subLevel }, thunkAPI) => {
    try {
    const response = await axios.post('/tasks', {
      text,
      date,
      parentId,
      subLevel,
    });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

export const deleteTask = createAsyncThunk<
  { _id: string; message: string },
  string,
  { rejectValue: string }
>('tasks/deleteTask', async (_id, thunkAPI) => {
  try {
    const response = await axios.delete(`/tasks/${_id}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

export const updateTask = createAsyncThunk<
  ITask,
  Partial<ITask>,
  { rejectValue: string }
>(
  'tasks/updateTask',

  async ({ _id, text }, thunkAPI) => {
    try {
      const response = await axios.patch(`/tasks/${_id}`, { text });
      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);
