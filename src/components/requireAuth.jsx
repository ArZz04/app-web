import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  let allowed = false;
  allowedRoles.forEach((role) => {
    if (auth?.role?.includes(role)) {
      allowed = true;
    }
  });

  return allowed ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
