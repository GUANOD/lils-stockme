import { useContext } from "react";
import { Navigate, redirect, useRoutes } from "react-router-dom";
// import NavBar from "../components/NavBar/NavBar";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

const CommonElements = () => {
  return (
    <>
      {/* <NavBar /> */}
      {/* <Landing /> */}
    </>
  );
};

export const AppRoutes = () => {
  const auth = useContext(AuthContext);
  const commonRoutes = [
    { path: "/", element: <CommonElements /> },
    { path: "*", element: <Navigate to="" /> },
  ];

  const routes = auth?.token ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
