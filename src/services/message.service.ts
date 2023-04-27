import { keepupApiAxiosInstance, messagesEndpoint, partiesEndpoint } from '../utils/axios';

export const createMessage = async (text: string, partyId: string) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).post(`${partyId}/${messagesEndpoint}`, { text });
  return response.data;
};

export const readAllMessage = async (pid: string) => {
  const response = await keepupApiAxiosInstance(partiesEndpoint).get(`${pid}/${messagesEndpoint}`);
  return response.data;
};

// export const readMessage = async (id: string) => {
//   const response = await keepupApiAxiosInstance(messagesEndpoint).get(id);
//   return response.data;
// };

// export const updateMessage = async (id: string, name: string) => {
//   const response = await keepupApiAxiosInstance(messagesEndpoint).put(id, { name });
//   return response.data;
// };

// export const deleteMessage = async (id: string) => {
//   const response = await keepupApiAxiosInstance(messagesEndpoint).delete(id);
//   return response.data;
// };
