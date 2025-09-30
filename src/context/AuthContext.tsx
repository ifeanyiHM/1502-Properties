import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextProps, defaultAuthProps } from "../Data/AuthProps";
import supabase from "../services/supabase";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>(defaultAuthProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [refreshUser, setRefreshUser] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.user);
    };

    checkUser();

    // Optional: Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session?.user);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        refreshUser,
        setRefreshUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
