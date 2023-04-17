import { circlesEndpoint, keepupApiAxiosInstance } from '../utils/axios';

export const createCircle = async (uid: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).post('/', { users: [uid] });
  return response;
};

export const readAllCircle = async () => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).get('/');
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

export const addFriend = async (uid: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).post(uid, { user: uid });
  return response;
};

export const removeFriend = async (uid: string) => {
  const response = await keepupApiAxiosInstance(circlesEndpoint).post(uid, { user: uid });
  return response;
};
