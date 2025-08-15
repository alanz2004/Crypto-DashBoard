import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user} = useAuth();

 
  // If no user is logged in → redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
