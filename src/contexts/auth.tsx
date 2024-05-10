import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
  useMemo,
} from "react";
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { auth } from "@/services/firebase";

type AuthContext = {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
};

export const authContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const values = useMemo(
    () => ({
      login,
      logOut,
      user,
    }),
    [login, logOut, user],
  );

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("ListsContext must be used within ListsContextProvider");
  }

  return context;
};
