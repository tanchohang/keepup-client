import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000/messages', {
  autoConnect: false,
  transports: ['websocket'],
  auth(cb) {
    cb({ token: sessionStorage.accessToken });
  },
});

socket.on('connect_error', (err) => {
  console.log(err.message);
});

socket.on('connect', () => {
  console.log('Connect');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});

export function sendMessage(text: string, party: string) {
  socket.emit('createMessage', { text, party });
}

export function joinParty(partyId: string) {
  socket.emit('joinParty', partyId);
}

export function typing(pid: string) {
  socket.emit('typing', pid);
}
