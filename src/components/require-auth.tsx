import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../context/auth.context';
import useLocalStorage from '../hooks/useLocalstorage';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const refreshToken = localStorage.getItem('token');

  return auth && refreshToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
