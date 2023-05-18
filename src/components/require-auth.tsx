import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = () => {
  const location = useLocation();

  const refreshToken = localStorage.getItem('token');

  return refreshToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
