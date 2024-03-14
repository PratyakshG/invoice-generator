import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import React from "react";

interface UserData {
  email: string;
  id: string;
  password: string;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface userContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: userContextProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!user) {
      axios.get<UserData>("/profile").then(({ data }) => {
        if (data) {
          setUser(data);
        }
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
