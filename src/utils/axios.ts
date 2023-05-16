import axios, { AxiosError, AxiosResponse } from 'axios';

const baseAPIURL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : 'http://localhost/api';

export const authEndpoint = 'auth';
export const usersEndpoint = 'users';
export const circlesEndpoint = 'circles';
export const partiesEndpoint = 'parties';
export const chatEndpoint = 'chats';
export const messagesEndpoint = 'messages';

export const keepupApiAxiosInstance = (endpoint: string) => {
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json' },
  });
  instance.interceptors.request.use(
    (config) => {
      config.baseURL = [baseAPIURL, endpoint].join('/');
      if (!config.headers.Authorization) {
        if (!(config.url === '/login' || config.url === '/refresh')) {
          const token = sessionStorage.getItem('accessToken');
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
          }
        }
      }
      // if (config.url !== '/refresh') {
      //   const token = localStorage.getItem('token');
      //   if (token) {
      //     config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
      //   }
      // }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (err: AxiosError) => {
      const originalConfig = err?.config;
      let retry: boolean = false;

      if (originalConfig && err.response) {
        // Access Token was expired
        const excludedUrl = ['/refresh', '/login'];

        if (!excludedUrl.includes(originalConfig.url as string) && err.response.status === 401) {
          try {
            const rs = await axios.get('/auth/refresh', {
              baseURL: baseAPIURL,
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const { accessToken } = rs.data;
            sessionStorage.setItem('accessToken', accessToken);
            originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
            return instance(originalConfig);
          } catch (_error: any) {
            // if (_error.response.status === 498 || _error.response.status === 401) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            // }
          }
        }
      }
      return Promise.reject(err);
    }
  );
  return instance;
};
