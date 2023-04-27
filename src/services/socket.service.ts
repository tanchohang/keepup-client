import { io } from 'socket.io-client';

export const socket = io('ws://localhost:3000', {
  auth(cb) {
    token: sessionStorage.getItem('accessToken');
  },
  retries: 5,
  ackTimeout: 10000,
});

socket.on('connect_error', (err) => {
  console.log(err);
});

export function sendMessage(message: string, party: string) {
  socket.emit('message', { message, party });
}
