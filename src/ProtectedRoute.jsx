import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userId"); // Check if user is logged in

  return isAuthenticated ? children : <Navigate to="/login" replace />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
