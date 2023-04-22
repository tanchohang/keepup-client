import { Navigate, Outlet, useNavigate } from 'react-router';
import useAuth, { AuthUser } from '../context/auth.context';
import { useEffect, useState } from 'react';
import { refreshAccessToken } from '../services/auth.service';

const UnAuthorized = () => {
  const { auth, setAuth } = useAuth();
  const refreshToken = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const { data } = await refreshAccessToken();
        //   setAuth(userWithToken.data);
        const { id, username, email, fullname, accessToken } = data;
        setAuth({ id, username, email, fullname, accessToken } as AuthUser);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth && refreshToken ? getAccessToken() : setIsLoading(false);
  }, []);

  return auth && refreshToken ? <Navigate to={`${auth?.username}`} replace /> : <Outlet />;
};
export default UnAuthorized;
