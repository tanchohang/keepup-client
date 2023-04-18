import { Party, PartyAction, partyReducer } from '../reducers/party.reducer';
import { User, UserAction, userReducer } from '../reducers/user.reducer';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';
import { Circle, CircleAction, circleReducer } from '../reducers/circle.reducer';
import { Message, MessageAction, messageReducer } from '../reducers/message.reducer';

export interface ChatState {
  circle: Circle;
  parties: Party[];
  messages: Message[];
  users: User[];
}
const initialState: ChatState = {
  circle: { id: '', users: [] },
  parties: [],
  messages: [],
  users: [],
};

export type ChatAction = UserAction & CircleAction & MessageAction & PartyAction;

interface ChatContextState extends ChatState {
  dispatch: Dispatch<UserAction | CircleAction | MessageAction | PartyAction>;
}

export const ChatContext = createContext<ChatContextState | undefined>(undefined);

const combinedReducer = (state: ChatState, action: UserAction | CircleAction | MessageAction | PartyAction): ChatState => {
  return {
    circle: circleReducer(state.circle, action as CircleAction),
    parties: partyReducer(state.parties, action as PartyAction),
    messages: messageReducer(state.messages, action as MessageAction),
    users: userReducer(state.users, action as UserAction),
  };
};

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chat, dispatch] = useReducer(combinedReducer, initialState);

  const value = {
    circle: chat.circle,
    parties: chat.parties,
    messages: chat.messages,
    users: chat.users,
    dispatch,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatState must be used within a ChatStateProvider');
  }
  return context;
};
