import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!active) return;
      setIsAuthorized(Boolean(user));
      setIsLoading(false);
    };

    void checkAuth();

    return () => {
      active = false;
    };
  }, []);

  if (isLoading) {
    return <p className="page">Checking session...</p>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
