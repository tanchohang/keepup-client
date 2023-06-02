import { z } from 'zod';
import { keepupApiAxiosInstance, partiesEndpoint } from '../utils/axios';

const Schema = z.array(
  z.object({
    name: z.string(),
    circle: z.string(),
    id: z.string(),
    users: z.string().array(),
  })
);

export const createParty = async (party: { users: string[]; name: string; circle: string }) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).post('/', party);
  return response;
};

export const readAllParty = async () => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).get('/');
  return response.data;
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
  console.log(id);
  const response = await keepupApiAxiosInstance(partiesEndpoint).delete('/' + id);
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
