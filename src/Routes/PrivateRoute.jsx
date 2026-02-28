import React from "react";
import useAuth from "../Hook/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {
  const { user, loading } = useAuth();
 
  if(loading) {
    return <div>
        <span className="loading loading-infinity loading-xl"></span>
    </div>
  }
  if (!user) {
    return <Navigate to="/auth/login"></Navigate>
  }

  return children;
};

export default PrivateRoute;
