const ProtectedRoute = ({ children, requiredRole }) => {

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login"; // Redirect immediately
    }

    const user = JSON.parse(localStorage.getItem("user"));

    // Check if the user is authenticated and has the required role
    if (!token || !user) {
        window.location.href = "../login"
    }

    if (requiredRole && user.role !== requiredRole) {
        window.location.href = "../unauthorized"
    }

    return children;
};

export default ProtectedRoute;