import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children, requiredRole }) => {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="../login" />;
    }

    let decode;
    try {
        decode = jwtDecode(token);
    } catch (error) {
        return <Navigate to="../login" />;
    }

    // Check if the user is authenticated and has the required role
    if (!decode.role) {
        return <Navigate to="../login" />;
    }

    if (requiredRole && decode.role !== requiredRole) {
        return <Navigate to="../login" />;
    }

    return children;
};

export default ProtectedAdminRoute;