import { ReactNode, createContext, useContext, useState } from 'react';

function useStoreState() {
  const store = useState<{ name: string; friends: string[] }>({ name: '', friends: [] });
  return store;
}
type PartyFormDataType = ReturnType<typeof useStoreState>;

const PartyFormContext = createContext<PartyFormDataType | null>(null);

export const PartyFormContextProvider = ({ children }: { children: ReactNode }) => {
  const partyFormstore = useState<{ name: string; friends: string[] }>({ name: '', friends: [] });

  return <PartyFormContext.Provider value={partyFormstore}>{children}</PartyFormContext.Provider>;
};

export const usePartyFormContext = () => useContext(PartyFormContext);
