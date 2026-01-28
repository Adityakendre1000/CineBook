import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // role-based check (if roles provided)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
