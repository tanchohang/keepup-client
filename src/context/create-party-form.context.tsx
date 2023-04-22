import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface PartyFormType {
  name: string;
  friends: string[];
}

interface PartyFormContextType {
  formdata: PartyFormType;
  setFormData: Dispatch<SetStateAction<PartyFormType>>;
}
const initialState: PartyFormContextType = {
  formdata: { name: '', friends: [] },
  setFormData: () => {},
};

const PartyFormContext = createContext<PartyFormContextType>(initialState);

export const PartyFormContextProvider = ({ children }: { children: ReactNode }) => {
  const [formdata, setFormData] = useState<PartyFormType>({ name: '', friends: [] });

  return <PartyFormContext.Provider value={{ formdata, setFormData }}>{children}</PartyFormContext.Provider>;
};

export const usePartyFormContext = () => useContext(PartyFormContext);
