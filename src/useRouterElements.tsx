import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import LoginPage from "./pages/auth/login/login";
import { pathAuth, pathRoute } from "./constants/path";
import MainLayout from "./layouts/main/main-layout";
import DashboardPage from "./pages/dashboard";
import TodolistPage from "./pages/todo";
import NotFoundPage from "./pages/errors/not-found";

const useRouterElements = () => {
   const ProtectedRoute = () => {
      const { isAuthenticated } = useAppContext();
      return isAuthenticated ? <Outlet /> : <Navigate to={pathAuth.login} />;
   };

   const RejectedRoute = () => {
      const { isAuthenticated } = useAppContext();
      return !isAuthenticated ? <Outlet /> : <Navigate to={pathRoute.dashboard} />;
   };

   const routeElements = useRoutes([
      {
         path: "",
         element: <ProtectedRoute />,
         children: [
            {
               path: pathRoute.dashboard,
               element: (
                  <MainLayout>
                     <DashboardPage />
                  </MainLayout>
               ),
            },
            {
               path: pathRoute.todolist,
               element: (
                  <MainLayout>
                     <TodolistPage />
                  </MainLayout>
               ),
            },
            {
               path: "*",
               element: <NotFoundPage />,
            },
         ],
      },
      {
         path: "",
         element: <RejectedRoute />,
         children: [
            {
               path: pathAuth.login,
               element: <LoginPage />,
            },
            {
               path: "*",
               element: <NotFoundPage />,
            },
         ],
      },
   ]);

   return routeElements;
};

export default useRouterElements;
