// import { lazyImport } from '@/utils/lazyImport';

import Auth from "../components/Auth/Auth";

// const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: "/auth/",
    element: <Auth />,
  },
];
