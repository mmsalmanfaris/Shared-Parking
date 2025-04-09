import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex justify-between pt-5 bg-gray-800 py-4 px-6">
            <h1 className="text-2xl font-semibold text-white pt-1">Welcome, Salman Faris!</h1>
            <div className="">
                <Link
                    to="/admin-dashboard/admins"
                    className="bg-blue-700 text-white py-2 px-4 rounded-md hover:text-black hover:shadow-2xl me-2"
                >
                    Admins
                </Link>
                <button
                    className="bg-red-700 text-white py-2 px-4 rounded-md hover:text-black hover:shadow-2xl"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default TopBar;