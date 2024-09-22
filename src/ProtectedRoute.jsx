import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
}
