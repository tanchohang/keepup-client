import { keepupApi, loginEndpoint } from './endpoints';

export const login = async (username: string, password: string) => {
  const response = await keepupApi.post(loginEndpoint, { username, password });
  return response;
};
