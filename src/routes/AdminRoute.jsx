import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
    const { role, isLoading: roleLoading } = useUserRole();

  if (loading) {
    return <div>Loading Auth...</div>;
  }

  if (!user) {
    return <Navigate to="/forbidden" replace />;
  }
  if (roleLoading) {
    return <div>Loading Role...</div>;
  }

  if (role === "admin") {
    return children;
  }

  return <Navigate to="/forbidden" replace />;
};

export default AdminRoute;