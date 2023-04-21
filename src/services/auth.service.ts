import { keepupApiAxiosInstance, authEndpoint } from '../utils/axios';

export const login = async (username: string, password: string) => {
  const response = await keepupApiAxiosInstance(authEndpoint).post('/login', { username, password });
  return response;
};
