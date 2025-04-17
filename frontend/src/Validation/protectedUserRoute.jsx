import { Children } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedUserRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");


    if (!token) {
        return <Navigate to="../login" />;
    }

    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch (error) {
        return <Navigate to="../login" />;
    }

    const currentTime = Date.now() / 1000; // in seconds

    // Check if token is expired
    if (decoded.exp < currentTime) {
        localStorage.removeItem("token"); // Optional cleanup
        return <Navigate to="../login" />;
    }

    if (!decoded.role) {
        return <Navigate to="../login" />;
    }

    if (requiredRole && decoded.role !== requiredRole) {
        return <Navigate to="../login" />;
    }
    return children
}

export default ProtectedUserRoute