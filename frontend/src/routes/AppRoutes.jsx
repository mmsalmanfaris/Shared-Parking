import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Packages from "../pages/Packages";
import Forget from "../pages/ForgetPassword";
import Reset from "../pages/PasswordReset";


// Admin Dashboard
import AdminDashboard from "../pages/adminDasboard/overview";
import AdminActivites from "../pages/adminDasboard/activites";
import AdminPayments from "../pages/adminDasboard/payments";
import AdminPackages from "../pages/adminDasboard/packages";
import AdminUsers from "../pages/adminDasboard/users";
import AdminReports from "../pages/adminDasboard/reports";
import AdminDevices from "../pages/adminDasboard/devices";
import AdminAlert from "../pages/adminDasboard/alerts";

// User Dashboard
import UserDashboard from "../pages/UserDashboard";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/forget-password" element={<Forget />} Route />
            <Route path="/passwod-reset" element={<Reset />} Route />

            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="admin-dashboard/activities" element={<AdminActivites />} />
            <Route path="admin-dashboard/payments" element={<AdminPayments />} />
            <Route path="admin-dashboard/packages" element={<AdminPackages />} />
            <Route path="admin-dashboard/users" element={<AdminUsers />} />
            <Route path="admin-dashboard/reports" element={<AdminReports />} />
            <Route path="admin-dashboard/devices" element={<AdminDevices />} />
            <Route path="admin-dashboard/alerts" element={<AdminAlert />} />



            <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
    );
};

export default AppRoutes;
