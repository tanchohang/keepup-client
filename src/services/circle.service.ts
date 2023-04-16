import { circlesEndpoint, keepupApi } from './endpoints';

export const createCircle = async (uid: string) => {
  const response = await keepupApi.post(circlesEndpoint, { users: [uid] });
  return response;
};

export const readAllCircle = async () => {
  const response = await keepupApi.get(circlesEndpoint);
  return response;
};

export const readCircle = async (id: string) => {
  const response = await keepupApi.get(circlesEndpoint);
  return response;
};

export const updateCircle = async (id: string, name: string) => {
  const response = await keepupApi.put(`${circlesEndpoint}/id`, { name });
  return response;
};

export const deleteCircle = async (id: string) => {
  const response = await keepupApi.delete(`${circlesEndpoint}/id`);
  return response;
};

export const addFriend = async (uid: string) => {
  const response = await keepupApi.post(`${circlesEndpoint}/uid`, { user: uid });
  return response;
};

export const removeFriend = async (uid: string) => {
  const response = await keepupApi.post(`${circlesEndpoint}/uid`, { user: uid });
  return response;
};
