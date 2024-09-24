import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

// interface PrivateRouteProps {
//   component: React.ComponentType;
//   redirectTo?: string;
// }

// export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component/>;
};
