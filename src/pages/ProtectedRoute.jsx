import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("authToken"); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
