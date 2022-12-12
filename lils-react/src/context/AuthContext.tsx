import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import storage from "../utils/storage";

export const AuthContext = createContext<{
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export const AuthProvider = (props: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(storage.getToken());

  useEffect(() => {
    if (token) {
      storage.setToken(token);
    } else {
      storage.clearToken();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};
