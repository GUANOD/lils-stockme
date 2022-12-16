import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const roleGuard = (
  auth: {
    token: string | null;
    role: number | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRole: React.Dispatch<React.SetStateAction<number | null>>;
  } | null,
  role: number
) => {
  // const auth = useContext(AuthContext);

  return !!auth?.role && role >= auth?.role;
};

export default roleGuard;
