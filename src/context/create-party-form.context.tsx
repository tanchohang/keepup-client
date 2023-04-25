import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

// interface PartyFormType {
//   name: string;
//   friends: string[];
// }

// interface PartyFormContextType {
//   formdata: PartyFormType;
//   setFormData: Dispatch<SetStateAction<PartyFormType>>;
// }
// const initialState: PartyFormContextType = {
//   formdata: { name: '', friends: [] },
//   setFormData: () => {},
// };

function useStoreState() {
  const store = useState({ name: '', friends: [''] });
  return store;
}
type PartyFormDataType = ReturnType<typeof useStoreState>;

const PartyFormContext = createContext<PartyFormDataType | null>(null);

export const PartyFormContextProvider = ({ children }: { children: ReactNode }) => {
  const partyFormstore = useState({ name: '', friends: [''] });

  return <PartyFormContext.Provider value={partyFormstore}>{children}</PartyFormContext.Provider>;
};

export const usePartyFormContext = () => useContext(PartyFormContext);
