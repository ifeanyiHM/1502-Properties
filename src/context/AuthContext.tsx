import { createContext, ReactNode, useState } from "react";
import { AuthContextProps, defaultAuthProps } from "../Data/AuthProps";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>(defaultAuthProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [refreshUser, setRefreshUser] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        refreshUser,
        setRefreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
