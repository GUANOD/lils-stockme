import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

// import { Spinner } from "@/components/Elements";
// import { MainLayout } from "@/components/Layout";
// import { lazyImport } from "@/utils/lazyImport";
import Dashboard from "../features/Dashboard/Dashboard";
import { Spinner } from "../components/Spinner/Spinner";
import { lazyImport } from "../utils";

// const { DiscussionsRoutes } = lazyImport(
//   () => import("@/features/discussions"),
//   "DiscussionsRoutes"
// );
// // const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
// const { Profile } = lazyImport(() => import("@/features/users"), "Profile");
// const { Users } = lazyImport(() => import("@/features/users"), "Users");

const App = () => {
  return (
    // <MainLayout>
    // <Suspense fallback={<Spinner />}>
    <Outlet />
    // </Suspense>
    // </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <App />,
    children: [
      { path: "", element: <Dashboard /> },
      // { path: '/users', element: <Users /> },
      // { path: '/profile', element: <Profile /> },
      // { path: '/', element: <Dashboard /> },
      // { path: '*', element: <Navigate to="." /> },
    ],
  },
];
