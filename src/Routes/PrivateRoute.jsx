import React from "react";
import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-2">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
        <p className="text-gray-400 text-xs font-semibold">Please wait</p>
      </div>
    );
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
