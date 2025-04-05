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
import AdminAdmins from "../pages/adminDasboard/admins"

// User Dashboard
import UserDashboard from "../pages/userDashboard/overview";
import UserVehicles from "../pages/userDashboard/vehicles";
import UserHistory from "../pages/userDashboard/history";
import UserPayments from "../pages/userDashboard/payments";
import UserReports from "../pages/userDashboard/reports";


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
            <Route path="admin-dashboard/admins" element={<AdminAdmins />} />

            {/* User Dashboard */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-dashboard/vehicles" element={<UserVehicles />} />
            <Route path="/user-dashboard/history" element={<UserHistory />} />
            <Route path="/user-dashboard/payments" element={<UserPayments />} />
            <Route path="/user-dashboard/reports" element={<UserReports />} />
        </Routes>
    );
};

export default AppRoutes;
