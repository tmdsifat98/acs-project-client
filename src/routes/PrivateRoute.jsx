import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner/>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location.pathname }} to="/auth/login" replace />;
};

export default PrivateRoute;