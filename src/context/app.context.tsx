import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface AppContextType {
  showMobileSidebar: boolean;
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}
const initialState: AppContextType = {
  showMobileSidebar: false,
  setShowMobileSidebar: () => {},
};

const AppContext = createContext<AppContextType>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  return <AppContext.Provider value={{ showMobileSidebar, setShowMobileSidebar }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
