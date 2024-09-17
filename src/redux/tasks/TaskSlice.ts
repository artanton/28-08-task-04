import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchTasks, deleteTask, addTask, updateTask } from './operators';
import { IState, ITask } from '../../helper/Task.types';
// import { RootState } from './store';

const initialState: IState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder

      // fetch

      .addCase(fetchTasks.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state: IState, action: PayloadAction<ITask[]>) => {
          state.isLoading = false;
          state.error = null;
          state.tasks = action.payload;
        }
      )
      .addCase(
        fetchTasks.rejected,
        (state: IState, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      )

      // add Task

      .addCase(addTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        addTask.fulfilled,
        (state: IState, action: PayloadAction<ITask>) => {
          state.isLoading = false;
          state.error = null;
          state.tasks.push(action.payload);
        }
      )
      .addCase(
        addTask.rejected,
        (state: IState, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      )

      // update Task

      .addCase(updateTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateTask.fulfilled,
        (state: IState, action: PayloadAction<ITask>) => {
          state.isLoading = false;
          state.error = null;
          const { _id, text } = action.payload;

          if (text) {
            const taskToUpdate = state.tasks.find(task => {
              return task._id === _id;
            });

            if (taskToUpdate) {
              taskToUpdate.text = text;
            }
          }
        }
      )
      .addCase(updateTask.rejected, (state: IState, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // delete tasks

      .addCase(deleteTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        deleteTask.fulfilled,
        (
          state: IState,
          action: PayloadAction<{ _id: string; message: string }>
        ) => {
          state.isLoading = false;
          state.error = null;

          const index = state.tasks.findIndex(
            tasks => tasks._id === action.payload._id
          );
          state.tasks.splice(index, 1);
        }
      )

      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const taskReducer = taskSlice.reducer;
