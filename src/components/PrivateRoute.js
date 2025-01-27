import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, redirectPath = "/login" }) => {
  return isAuthenticated ? element : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
