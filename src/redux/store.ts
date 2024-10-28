import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from './tasks/TaskSlice';
import { authReducer } from './auth/AuthSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { setupAxiosInterceptors } from '../helper/axiosInterceptr';
// import authMiddleware from '../helper/authMiddlware';

const authPersistConfig ={
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
}
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);



export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // auth: authReducer,
    task: taskReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    // .concat(authMiddleware)
    ,
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor= persistStore (store);


// const waitForRehydration = new Promise<void>((resolve) => {
//   const unsubscribe = persistor.subscribe(() => {
//     console.log(persistor.getState());
//     if (persistor.getState()) {
//       unsubscribe();
//       resolve();
//     }
//   });
// });

// waitForRehydration.then(() => {
//   setupAxiosInterceptors(store); // Now setup interceptors after store is rehydrated
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;