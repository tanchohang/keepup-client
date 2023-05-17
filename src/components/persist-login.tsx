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
        setAuth({ id, username, email, fullname, accessToken, circle, online } as AuthUser);
      } catch (error) {
        console.error(error);
      }
    };
    refreshToken ? getAccessToken() : redirect('/login');
  }, []);

  return auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default PersistLogin;
