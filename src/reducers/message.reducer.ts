export interface Message {
  id: string;
  text: string;
  party: string;
  sender: string;
  receiver: string;
  createdAt: string;
}

export const enum MessageActionEmun {
  CREATE_MESSAGE = 'CREATE_MESSAGE',
  READ_MESSAGES = 'READ_MESSAGES',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
}

export type MessageAction =
  | { type: MessageActionEmun.READ_MESSAGES; payload: Message[] }
  | { type: MessageActionEmun.CREATE_MESSAGE; payload: Message }
  | { type: MessageActionEmun.UPDATE_MESSAGE; payload: Message }
  | { type: MessageActionEmun.DELETE_MESSAGE; payload: string };

export const messageReducer = (messages: Message[], action: MessageAction): Message[] => {
  switch (action.type) {
    case MessageActionEmun.READ_MESSAGES:
      return messages;
    case MessageActionEmun.CREATE_MESSAGE:
      return [...messages, action.payload];

    case MessageActionEmun.UPDATE_MESSAGE:
      return [...messages?.filter((u) => u.id !== action.payload.id), action.payload];

    case MessageActionEmun.DELETE_MESSAGE:
      return [...messages?.filter((u) => u.id !== action.payload)];

    default:
      return messages;
  }
};
