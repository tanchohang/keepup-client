import { useEffect } from 'react';
import useAuth from '../context/auth.context';
import { keepupApiAxiosInstance } from '../utils/axios';

export default function useAuthKeepApi(endpoint: string) {
  const axiosKeepApi = keepupApiAxiosInstance(endpoint);
  const { auth } = useAuth();
  axiosKeepApi.defaults.headers.common['Authorization'] = ['Bearer', auth?.access_token].join(' ');

  //   useEffect(() => {
  //     const interceptor = axiosKeepApi.interceptors.request.use(function (config) {
  // config.
  //      })

  //     return()=>axiosKeepApi.interceptors.request.eject(interceptor)
  //   }, [auth]);

  return axiosKeepApi;
}
