import { AuthUser } from '../context/auth.context';
import { keepupApiAxiosInstance, usersEndpoint } from '../utils/axios';

export const createUser = async (user: AuthUser) => {
  const response = await keepupApiAxiosInstance(usersEndpoint).post('/', { ...user, username: user.username.toLowerCase() });
  return response;
};

export const readAllUser = async () => {
  const response = await keepupApiAxiosInstance(usersEndpoint).get('/');
  return response;
};

export const readUser = async (id: string) => {
  const response = await keepupApiAxiosInstance(usersEndpoint).get(id);
  return response;
};

export const updateUser = async (id: string, name: string) => {
  const response = await keepupApiAxiosInstance(usersEndpoint).put(id, { name });
  return response;
};

export const deleteUser = async (id: string) => {
  const response = await keepupApiAxiosInstance(usersEndpoint).delete(id);
  return response;
};
