import React from "react";
import useRole from "../Hook/useRole";
import { Navigate } from "react-router";
import useAuth from "../Hook/useAuth";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading || loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (role !== "rider") {
    return (
      <>
        <Navigate replace to="/" />
      </>
    );
  }

  return children;
};

export default RiderRoute;
