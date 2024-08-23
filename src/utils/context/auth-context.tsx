import localforage from "localforage";
import { createContext, ReactNode, useEffect, useState, useContext, useCallback } from "react";
import { AuthType } from "../../types/auth";

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  user: AuthType | null;
  setUser: (user: AuthType) => void;
  logout: () => void;
}
localforage.setDriver(localforage.LOCALSTORAGE);

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<AuthType | null>(null);

  const logout = useCallback(() => {
    setUser(null);
    localforage.removeItem("user");
    localforage.removeItem("baseURL");
  }, []);


  useEffect(() => {
    const checkUser = async () => {
      try {
        const userFromStorage = await localforage.getItem<AuthType>("user");
        if (userFromStorage) {
          setUser(userFromStorage);
        } else {
          logout();
        }
      } catch (error: unknown) {
        console.error(error)
        logout();
      }
    };

    checkUser();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, logout, setUser, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context: IAuthContext | undefined = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
