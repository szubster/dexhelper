import { createContext, type ReactNode, useContext, useState } from 'react';
import { redirectPage } from '../utils/window';

export const AUTH_LOGGED_IN_INDICATOR = 'isLoggedIn';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_LOGGED_IN_INDICATOR) === 'true';
  });

  const login = () => {
    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    setIsLoggedIn(true);
    redirectPage('/cdn-cgi/access/login');
  };

  const logout = () => {
    localStorage.removeItem(AUTH_LOGGED_IN_INDICATOR);
    setIsLoggedIn(false);
    redirectPage('/cdn-cgi/access/logout');
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
