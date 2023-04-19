import axios from 'axios';

const baseAPIURL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : 'https://keepup.tanchohang.dev/api';

export const authEndpoint = 'auth';
export const usersEndpoint = 'users';
export const circlesEndpoint = 'circles';
export const partiesEndpoint = 'parties';
export const chatEndpoint = 'chats';
export const messagesEndpoint = 'messages';

export const keepupApiAxiosInstance = (endpoint: string) =>
  axios.create({
    baseURL: [baseAPIURL, endpoint].join('/'),
    headers: { 'Content-Type': 'application/json' },
  });
