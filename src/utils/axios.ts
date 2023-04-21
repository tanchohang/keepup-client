import axios from 'axios';

const baseAPIURL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : 'https://keepup.tanchohang.dev/api';

export const authEndpoint = 'auth';
export const usersEndpoint = 'users';
export const circlesEndpoint = 'circles';
export const partiesEndpoint = 'parties';
export const chatEndpoint = 'chats';
export const messagesEndpoint = 'messages';

export const keepupApiAxiosInstance = (endpoint: string) => {
  const instance = axios.create({
    baseURL: baseAPIURL,
    headers: { 'Content-Type': 'application/json' },
  });
  instance.interceptors.request.use(
    (config) => {
      config.baseURL = [baseAPIURL, endpoint].join('/');
      if (config.url !== '/login') {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
          // config.headers['x-access-token'] = token; // for Node.js Express back-end
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== '/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await instance.get('/auth/refresh', { headers: { Authorization: localStorage.getItem('token') } });

            const { accessToken } = rs.data;
            sessionStorage.setItem(accessToken, accessToken);

            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
  return instance;
};
