import { circlesEndpoint, keepupApiAuthAxiosInstance, keepupApiAxiosInstance } from '../utils/axios';

const axiosInstance = keepupApiAxiosInstance;

export const createCircle = async () => {
  const response = await axiosInstance(circlesEndpoint).post('/');
  return response;
};

export const readAllCircle = async () => {
  const response = await axiosInstance(circlesEndpoint).get('/creator');
  return response;
};

export const readCircle = async (id: string) => {
  const response = await axiosInstance(circlesEndpoint).get(id);
  return response;
};

export const updateCircle = async (id: string, name: string) => {
  const response = await axiosInstance(circlesEndpoint).put(id, { name });
  return response;
};

export const deleteCircle = async (id: string) => {
  const response = await axiosInstance(circlesEndpoint).delete(id);
  return response;
};

export const addToCircle = async (uid: string) => {
  const response = await axiosInstance(circlesEndpoint).post(uid, { user: uid });
  return response;
};

export const removeFromCircle = async (uid: string) => {
  const response = await axiosInstance(circlesEndpoint).post(uid, { user: uid });
  return response;
};
