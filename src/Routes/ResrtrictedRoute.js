
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';



export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, user } = useAuth();
  console.log(user.verify);
  if(isLoggedIn &&!user.verify){
    return Component}

  return isLoggedIn &&user.verify ? <Navigate to={redirectTo} /> : Component;
};