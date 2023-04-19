import { partiesEndpoint, keepupApiAxiosInstance } from '../utils/axios';

export const createParty = async () => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).post('/');
  return response;
};

export const readAllParty = async () => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).get('/creator');
  return response;
};

export const readParty = async (id: string) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).get(id);
  return response;
};

export const updateParty = async (id: string, name: string) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).put(id, { name });
  return response;
};

export const deleteParty = async (id: string) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).delete(id);
  return response;
};

export const addToParty = async (uid: string) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).post(uid, { user: uid });
  return response;
};

export const removeFromParty = async (uid: string) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).post(uid, { user: uid });
  return response;
};
