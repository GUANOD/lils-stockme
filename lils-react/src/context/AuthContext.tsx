import { IconLicenseOff } from "@tabler/icons";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { validateAuthToken } from "../service/auth/auth.service";
import { authRoutes } from "../service/auth/routes";
import storage from "../utils/storage";
import { ErrorContext } from "./ErrorContext";

export const AuthContext = createContext<{
  token: string | null;
  role: number | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRole: React.Dispatch<React.SetStateAction<number | null>>;
} | null>(null);

export const AuthProvider = (props: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [role, setRole] = useState<number | null>(storage.getRole());
  const errorContext = useContext(ErrorContext);

  /**
   * runs on mount and every time token changes to validate token
   */
  useEffect(() => {
    if (token && role) {
      validateToken();
    }
  }, [token, role]);

  /**
   * Validates token with the API
   *
   * */
  const validateToken = async () => {
    try {
      await validateAuthToken(token as string);
      setAuthStorage();
    } catch (err) {
      clearAuth();
    }
  };

  /**
   * Sets auth in local storage
   *
   * */
  const setAuthStorage = () => {
    storage.setToken(token as string);
    storage.setRole(role as number);
  };

  /**
   * Clears auth in local storage and memory
   */
  const clearAuth = () => {
    errorContext?.setError({
      message: "Please login",
      icon: <IconLicenseOff />,
    });
    storage.clearToken();
    storage.getRole();
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, setToken, setRole }}>
      {props.children}
    </AuthContext.Provider>
  );
};
