import React from "react";

import useRole from "../Hook/useRole";
import { Navigate } from "react-router";
import useAuth from "../Hook/useAuth";

const AdminRoute = ({ children }) => {

  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading || loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <>
       <Navigate replace to="/"/>
      </>
    );
  }

  return children;
};

export default AdminRoute;