import useSWR from 'swr';
import useAuth from '../context/auth.context';
import { refreshAccessToken } from '../services/auth.service';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { data, isLoading, error } = useSWR('/refresh', refreshAccessToken);

    if (data) {
      setAuth((prev: any) => {
        return { ...prev, accessToken: data.data.accessToken };
      });
    }
    return data?.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
