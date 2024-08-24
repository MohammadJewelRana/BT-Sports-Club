/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the shape of user data
export interface User {
  name: string;
  password: string;
}

// Define the shape of the context value
export interface AuthContextType {
  user: User | null;
  setUser: (user: any) => void;
}

// Create the context with an initial value of null
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {    
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
      }
    }
  }, []);

  const authInfo:AuthContextType = {
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
