import useAuthContext from "../hooks/useAuthContext";
import { Navigate, useLocation } from "react-router-dom"; 

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  // Show a loading spinner while checking auth status
  if (user === null && localStorage.getItem("authTokens")) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner text-red-600 loading-lg"></span>
      </div>
    );
  }

  // Redirect to login if not authenticated, preserving the intended destination
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;