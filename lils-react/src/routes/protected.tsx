import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { sections } from "../features/Dashboard/sections";
import { Section } from "../types";
import { lazyImport } from "../utils";
// import { NavBar } from "../components/NavBar/NavBar";

const { Dashboard } = lazyImport(
  () => import("../features/Dashboard/Dashboard"),
  "Dashboard"
);

// const { DiscussionsRoutes } = lazyImport(
//   () => import("@/features/discussions"),
//   "DiscussionsRoutes"
// );
// // const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
// const { Profile } = lazyImport(() => import("@/features/users"), "Profile");
// const { Users } = lazyImport(() => import("@/features/users"), "Users");

const App = () => {
  return (
    <>
      {/* // <MainLayout> */}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {/* // </MainLayout> */}
    </>
  );
};

const calcAllowedRoutes = (
  auth: {
    token: string | null;
    role: number | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRole: React.Dispatch<React.SetStateAction<number | null>>;
  } | null
) => {
  let allowedSections: Section[] = sections(auth);

  let allowedRoutes = allowedSections.map((sec) => {
    return {
      path: sec.path,
      element: <Dashboard preSelection={sec} />,
    };
  });
  return allowedRoutes;
};

export const protectedRoutes = (
  auth: {
    token: string | null;
    role: number | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRole: React.Dispatch<React.SetStateAction<number | null>>;
  } | null
) => {
  return [
    {
      path: "/dashboard",
      element: <App />,
      children: calcAllowedRoutes(auth),
    },
    {
      path: "/auth",
      element: <Navigate to="/dashboard" />,
    },
  ];
};
