import { useContext } from "react";
import { Navigate, Outlet, redirect, useRoutes } from "react-router-dom";
// import NavBar from "../components/NavBar/NavBar";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { lazyImport } from "../utils";

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { NavBar } from "../components/NavBar/NavBar";
import roleGuard from "../features/Auth/guards/roleGuard";

const CommonElements = () => {
  return (
    <>
      <Outlet />
      {/* <Landing /> */}
    </>
  );
};

export const AppRoutes = () => {
  const auth = useContext(AuthContext);
  const routes = [
    {
      path: "/",
      element: <CommonElements />,
      children: auth?.token ? protectedRoutes() : publicRoutes,
    },
    { path: "*", element: <Navigate to="" /> },
  ];

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
