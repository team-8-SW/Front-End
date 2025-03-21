import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children, ...rest }) => {
  const storedUserId = localStorage.getItem("userId");

  if (!storedUserId) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {children &&
        React.cloneElement(children, { ...rest }) /* Forward props */}
    </>
  );
};

export default ProtectedRoute;
