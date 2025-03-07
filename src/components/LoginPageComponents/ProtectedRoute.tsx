import { UserRole } from "../../lib/types/authTypes";
import { useAuthStore } from "../../stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  return (
    <>
      {userRole && allowedRoles.includes(userRole) ? (
        <Outlet />
      ) : (
        <Navigate to={"/unauthorized"} />
      )}
    </>
  );
};

export default ProtectedRoute;
