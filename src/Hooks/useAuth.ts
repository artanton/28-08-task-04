import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing, selectUser, selectErrorMessage } from '../redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const isError = useSelector(selectErrorMessage);

  return {
    isLoggedIn,
    isRefreshing,
    isError,
    user,
  };
};
