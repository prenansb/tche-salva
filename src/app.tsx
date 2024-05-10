import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "@/pages/dashboard";
import { Login } from "@/pages/login";
import { AuthProvider } from "@/contexts/auth";
import { PrivateRoute } from "@/components/private-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);

export const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
