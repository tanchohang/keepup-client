import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000/messages', {
  autoConnect: false,
  transports: ['websocket'],
  auth(cb) {
    cb({ token: sessionStorage.getItem('accessToken') });
  },
});

export const appsocket = io('http://localhost:3000', {
  autoConnect: false,
  transports: ['websocket'],
  auth(cb) {
    cb({ token: sessionStorage.getItem('accessToken') });
  },
});

//Lifecycle Events

appsocket.on('connect', () => {
  appsocket.emit('online');
});

socket.on('connect_error', (err) => {
  console.log(err.message);
});

socket.on('connect', async () => {
  console.log('Connect');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});

//Actions

export function sendMessage(text: string, party: string) {
  socket.emit('createMessage', { text, party });
}

export function joinParty(partyId: string) {
  socket.emit('joinParty', partyId);
}

export function typing(pid: string) {
  socket.emit('typing', pid);
}

export function call(offer: any) {
  let response: any;
  socket.emit('call', offer, (res: any) => {
    console.log(res);
    return res;
  });
}

export function hangup(pid: string) {
  socket.emit('hangup', pid);
}
