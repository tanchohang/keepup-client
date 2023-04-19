import { circlesEndpoint, keepupApiAxiosInstance } from '../utils/axios';

export const createCircle = async () => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).post('/');
  return response;
};

export const readAllCircle = async () => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).get('/creator');
  return response;
};

export const readCircle = async (id: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).get(id);
  return response;
};

export const updateCircle = async (id: string, name: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).put(id, { name });
  return response;
};

export const deleteCircle = async (id: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).delete(id);
  return response;
};

export const addToCircle = async (uid: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).post(uid, { user: uid });
  return response;
};

export const removeFromCircle = async (uid: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).post(uid, { user: uid });
  return response;
};
