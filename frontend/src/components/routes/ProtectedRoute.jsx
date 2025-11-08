import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-10">
        <LoadingSpinner />
        <p className="mt-3 text-sm font-display text-vr-blue">
          {" "}
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role?.name)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
