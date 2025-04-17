import { Children } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedUserRoute = ({ children, requiredRole }) => {
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

    if (!decode.role) {
        return <Navigate to="../login" />;
    }

    if (requiredRole && decode.role !== requiredRole) {
        return <Navigate to="../login" />;
    }
    return children
}

export default ProtectedUserRoute