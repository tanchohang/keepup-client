import { useEffect, useState } from 'react';
import useAuth, { AuthUser } from '../context/auth.context';
import { refreshAccessToken } from '../services/auth.service';
import { Outlet } from 'react-router-dom';

interface Props {}
const PersistLogin = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refreshToken = localStorage.getItem('token');

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const { data } = await refreshAccessToken();
        //   setAuth(userWithToken.data);
        const { id, username, email, fullname, accessToken, circle } = data;
        setAuth({ id, username, email, fullname, accessToken, circle } as AuthUser);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken && refreshToken ? getAccessToken() : setIsLoading(false);
  }, []);

  //   useEffect(() => {
  //     console.log(auth);
  //   }, [isLoading]);
  return isLoading ? <div>...Loading</div> : <Outlet />;
};
export default PersistLogin;
