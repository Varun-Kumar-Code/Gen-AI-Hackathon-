import React, { createContext, useContext, useState } from 'react';

// Simple auth context without Firebase complexity
interface SimpleAuthContextType {
  user: any;
  isLoggedIn: boolean;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const SimpleAuthContext = createContext<SimpleAuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  loading: false,
});

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const login = (userData: any) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return (
    <SimpleAuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      loading
    }}>
      {children}
    </SimpleAuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within SimpleAuthProvider');
  }
  return context;
};