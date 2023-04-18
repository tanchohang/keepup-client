import { Dispatch, DispatchWithoutAction, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

export type AuthUser = {
  username: string;
  fullname: string;
  id: string;
  email: string;
  access_token: string;
};

interface AuthContextType {
  auth: AuthUser | null;
  setAuth: Dispatch<SetStateAction<AuthUser | null>>;
}

const initialState: AuthContextType = {
  auth: null,
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
