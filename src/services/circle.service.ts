import { circlesEndpoint, keepupApiAxiosInstance } from '../utils/axios';

const axiosInstance = keepupApiAxiosInstance;

export const createCircle = async () => {
  const response = await axiosInstance(circlesEndpoint).post('/');
  return response.data;
};

export const readAllCircle = async () => {
  const response = await axiosInstance(circlesEndpoint).get('/creator');
  return response.data;
};

export const readCircle = async (id: string) => {
  const response = await axiosInstance(circlesEndpoint).get(id);
  return response.data;
};

export const updateCircle = async (id: string, name: string) => {
  const response = await axiosInstance(circlesEndpoint).put(id, { name });
  return response.data;
};

export const deleteCircle = async (id: string) => {
  const response = await axiosInstance(circlesEndpoint).delete(id);
  return response.data;
};

export const addToCircle = async (email: string, circle: string) => {
  const response = await axiosInstance(circlesEndpoint).patch('/email', { email, circle });
  return response.data;
};

export const removeFromCircle = async (uid: string) => {
  const response = await axiosInstance(circlesEndpoint).post(uid, { user: uid });
  return response.data;
};
