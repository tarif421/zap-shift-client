import React from "react";
import useAuth from "../Hook/useAuth";

import useRole from "../Hook/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth;
  const { role, roleLoading } = useRole();
  if (roleLoading || loading) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
  if (role !== "admin") {
    return (
      <>
        <h2>acccess Forbidden</h2>
      </>
    );
  }
  return children;
};

export default AdminRoute;
