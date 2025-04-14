import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children, requiredRole }) => {

    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="../login" />;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    // Check if the user is authenticated and has the required role
    if (!user) {
        return <Navigate to="../login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="../login" />;
    }

    return children;
};

export default ProtectedAdminRoute;