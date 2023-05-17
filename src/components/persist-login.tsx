import { useEffect, useState } from 'react';
import useAuth, { AuthUser } from '../context/auth.context';
import { refreshAccessToken } from '../services/auth.service';
import { Navigate, Outlet, redirect, useLocation } from 'react-router-dom';

interface Props {}
const PersistLogin = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const refreshToken = localStorage.getItem('token');

    const getAccessToken = async () => {
      try {
        const { data } = await refreshAccessToken();
        const { id, username, email, fullname, accessToken, circle, online } = data;
        console.log('getting access token');

        setAuth({ id, username, email, fullname, accessToken, circle, online } as AuthUser);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    refreshToken ? getAccessToken() : redirect('/login');
  }, []);

  return isLoading ? <Navigate to="/login" state={{ from: location }} replace /> : <Outlet />;
};
export default PersistLogin;
