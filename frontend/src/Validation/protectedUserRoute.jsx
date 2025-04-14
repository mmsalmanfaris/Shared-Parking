import { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"))

    if (!token) {
        return <Navigate to="../login" />;
    }

    if (!user) {
        return <Navigate to="../login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="../login" />;
    }
    return children
}

export default ProtectedUserRoute