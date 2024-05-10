import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/auth";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (user) {
    return children;
  }

  return <Navigate to="/" replace />;
};
