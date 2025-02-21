import React from "react";
import { Navigate } from "react-router-dom";
import { STORAGE_KEY } from "../constants/utils";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem(STORAGE_KEY.USER);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
