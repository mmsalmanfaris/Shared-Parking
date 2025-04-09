import React from 'react'
import { Routes, Route } from "react-router-dom";

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
import ProtectedAdminRoute from '../Validation/protectedAdminRoute';


const ProtectedRoutes = () => {

    return (

        <Routes>
            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminDashboard />
                </ProtectedAdminRoute>
            }
            />
            <Route path="admin-dashboard/activities" element={
                <ProtectedAdminRoute>
                    <AdminActivites />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/payments" element={
                <ProtectedAdminRoute>
                    <AdminPayments />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/packages" element={
                <ProtectedAdminRoute>
                    <AdminPackages />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/users" element={
                <ProtectedAdminRoute>
                    <AdminUsers />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/reports" element={
                <ProtectedAdminRoute>
                    <AdminReports />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/devices" element={
                <ProtectedAdminRoute>
                    <AdminDevices />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/alerts" element={
                <ProtectedAdminRoute>
                    <AdminAlert />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/admins" element={
                <ProtectedAdminRoute>
                    <AdminAdmins />
                </ProtectedAdminRoute>
            } />

            {/* User Dashboard */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-dashboard/vehicles" element={<UserVehicles />} />
            <Route path="/user-dashboard/history" element={<UserHistory />} />
            <Route path="/user-dashboard/payments" element={<UserPayments />} />
            <Route path="/user-dashboard/reports" element={<UserReports />} />
        </Routes>
    )
}

export default ProtectedRoutes