import axios from 'axios';
const baseAPIURL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/' : 'https://keepup.tanchohang.dev/api';
export const keepupApi = axios.create({
  baseURL: baseAPIURL,

  headers: { 'Content-Type': 'application/json' },
});

export const loginEndpoint = '/login';
export const usersEndpoint = '/users';
export const circlesEndpoint = '/circles';
export const partiesEndpoint = '/parties';
export const chatEndpoint = '/chats';
export const messageEndpoint = '/messages';
