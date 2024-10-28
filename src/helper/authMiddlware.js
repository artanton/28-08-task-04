// import { Middleware } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { refreshUser, regenerateTokens } from '../redux/auth/operators';

const authMiddleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    // const state = getState();
   
    const result = action;

    // console.log('result:', result);
    // console.log(dispatch(action));
    
    // if (
    //   // axios.isAxiosError(result?.error)
    //   // &&
    //   // result?.payload === 'jwt expired' ||
    //   // result?.payload === 'Request failed with status code 401'
    // ) {
    //   // console.log(state.auth.isLoggedIn);
    //   // dispatch(regenerateTokens());
    //   // state.auth.isLoggedIn = false;
    //   // if (!state.auth.isRefreshing) {
    //   // }
    // }

    return next(action);
  };

export default authMiddleware;
