import { keepupApiAxiosInstance, messagesEndpoint } from '../utils/axios';

export const createMessage = async () => {
  const response = await keepupApiAxiosInstance(messagesEndpoint).post('/');
  return response;
};

export const readAllMessage = async () => {
  const response = await keepupApiAxiosInstance(messagesEndpoint).get('/creator');
  return response;
};

export const readMessage = async (id: string) => {
  const response = await keepupApiAxiosInstance(messagesEndpoint).get(id);
  return response;
};

export const updateMessage = async (id: string, name: string) => {
  const response = await keepupApiAxiosInstance(messagesEndpoint).put(id, { name });
  return response;
};

export const deleteMessage = async (id: string) => {
  const response = await keepupApiAxiosInstance(messagesEndpoint).delete(id);
  return response;
};

export const addToMessage = async (uid: string) => {
  const response = await keepupApiAxiosInstance(messagesEndpoint).post(uid, { user: uid });
  return response;
};

export const removeFromMessage = async (uid: string) => {
  const response = await keepupApiAxiosInstance(messagesEndpoint).post(uid, { user: uid });
  return response;
};
