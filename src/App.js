import { lazy, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLauout';
import { PrivateRoute } from './Routes/PrivatRoute';
import { RestrictedRoute } from './Routes/ResrtrictedRoute';
import { refreshUser } from './redux/auth/operators';
import { useAuth } from './Hooks/useAuth';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';

import { MagnifyingGlass } from 'react-loader-spinner';
import { Loader } from './AppLayoutStyled';

const HomePage = lazy(() => import('./Pages/Home/HomePage'));
const RegisterPage = lazy(() => import('./Pages/Register/RegisterPage'));
const LoginPage = lazy(()=> import('./Pages/Login/LoginPage'));
const TaskPage = lazy(()=> import ('./Pages/mainPage/TaskPage'));

export const App = () => {
  const dispatch =useDispatch();
  const { isRefreshing } = useAuth();

useEffect(()=>{
  dispatch(refreshUser());
},[dispatch])



  return isRefreshing?(
    <Loader>
    <MagnifyingGlass
      visible={true}
      height="120"
      width="120"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#3d9bba"
      color="#0f0d0d"
    />
  </Loader>
  ): (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<RegisterPage />} />
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
          }
        />

        <Route
        path='/tasks'
        element={
          <PrivateRoute redirectTo='/login' component={<TaskPage/>}/>
        } />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};