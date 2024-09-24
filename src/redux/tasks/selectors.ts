// import { createSelector } from '@reduxjs/toolkit';

import { RootState } from "../store";

export const selectTask =( state: RootState )=> state.task.tasks;

export const selectIsLoading =( state: RootState ) => state.task.isLoading;

export const selectError = ( state: RootState ) => state.task.error;

