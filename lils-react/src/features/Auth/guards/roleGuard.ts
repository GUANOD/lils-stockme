import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const roleGuard = (role: number) => {
  const auth = useContext(AuthContext);

  return !!auth?.role && role >= auth?.role;
};

export default roleGuard;
