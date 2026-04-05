import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  role
}) => {

  const token =
    localStorage.getItem("token");

  const userRole =
    localStorage.getItem("role");

  // ❌ No login
  if (!token) {
    return <Navigate to="/" />;
  }

  // ❌ Role mismatch
  if (role && role !== userRole) {
    return <Navigate to="/products" />;
  }

  return children;
};

export default ProtectedRoute;