import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface ChatMiniContextType {
  selectedParty: string | undefined;
  setSelectedParty: Dispatch<SetStateAction<string | undefined>>;
}
const initialState: ChatMiniContextType = {
  selectedParty: undefined,
  setSelectedParty: () => {},
};

const ChatMiniContext = createContext<ChatMiniContextType>(initialState);

export const ChanMiniContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedParty, setSelectedParty] = useState<string | undefined>(undefined);

  return <ChatMiniContext.Provider value={{ selectedParty, setSelectedParty }}>{children}</ChatMiniContext.Provider>;
};

export const useChatMiniContext = () => useContext(ChatMiniContext);
