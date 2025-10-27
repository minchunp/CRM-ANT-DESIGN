import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import LoginPage from "./pages/auth/login";
import { pathAuth } from "./constants/path";

const useRouterElements = () => {
   const ProtectedRoute = () => {
      const { isAuthenticated } = useAppContext();
      return isAuthenticated ? <Outlet /> : <Navigate to={pathAuth.login} />;
   };

   const RejectedRoute = () => {
      const { isAuthenticated } = useAppContext();
      return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
   };

   const routeElements = useRoutes([
      {
         path: "",
         element: <ProtectedRoute />,
         children: [],
      },
      {
         path: "",
         element: <RejectedRoute />,
         children: [
            {
               path: pathAuth.login,
               element: <LoginPage />,
            },
         ],
      },
   ]);

   return routeElements;
};

export default useRouterElements;
