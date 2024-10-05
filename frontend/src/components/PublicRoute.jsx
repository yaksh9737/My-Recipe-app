// src/components/PublicRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner if needed
  }

  return user ? <Navigate to="/" /> : children; // Redirect logged-in users to homepage or any other route
};

export default PublicRoute;
