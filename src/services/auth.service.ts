import { keepupApiAxiosInstance, authEndpoint } from '../utils/axios';

export const login = async (username: string, password: string) => {
  const response = await keepupApiAxiosInstance(authEndpoint).post('/login', { username: username.toLowerCase(), password });
  return response;
};

export const refreshAccessToken = async () => {
  const response = await keepupApiAxiosInstance(authEndpoint).get('/refresh', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response;
};

export const logout = async () => {
  const response = await keepupApiAxiosInstance(authEndpoint).delete('/logout');
  if (response.data.acknowledged) {
    sessionStorage.clear();
    localStorage.clear();
  }
  return response.data.acknowledged;
};
