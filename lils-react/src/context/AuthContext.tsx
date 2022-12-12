import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import storage from "../utils/storage";

export const AuthContext = createContext<{
  token: string | null;
  role: number | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRole: React.Dispatch<React.SetStateAction<number | null>>;
} | null>(null);

export const AuthProvider = (props: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [role, setRole] = useState<number | null>(storage.getRole());

  useEffect(() => {
    if (token) {
      storage.setToken(token);
    } else {
      storage.clearToken();
    }
    if (role) {
      storage.setRole(role);
    } else {
      storage.clearRole();
    }
  }, [token, role]);

  return (
    <AuthContext.Provider value={{ token, role, setToken, setRole }}>
      {props.children}
    </AuthContext.Provider>
  );
};
