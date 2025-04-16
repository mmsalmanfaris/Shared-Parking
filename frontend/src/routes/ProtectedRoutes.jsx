import React from 'react'
import { Route } from "react-router-dom";
import ProtectedAdminRoute from '../Validation/protectedAdminRoute';
import ProtectedUserRoute from '@/Validation/protectedUserRoute';

// Admin Dashboard
import AdminDashboard from "../pages/adminDasboard/overview";
import AdminActivites from "../pages/adminDasboard/activites";
import AdminPayments from "../pages/adminDasboard/payments";
import AdminPackages from "../pages/adminDasboard/packages";
import AdminUsers from "../pages/adminDasboard/users";
import AdminVehicles from "../pages/adminDasboard/vehicles";
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


const ProtectedRoutes = () => {

    return (
        <>
            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminDashboard />
                </ProtectedAdminRoute>
            }
            />
            <Route path="admin-dashboard/activities" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminActivites />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/payments" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminPayments />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/packages" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminPackages />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/users" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminUsers />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/vehicles" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminVehicles />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/reports" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminReports />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/devices" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminDevices />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/alerts" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminAlert />
                </ProtectedAdminRoute>
            } />
            <Route path="admin-dashboard/admins" element={
                <ProtectedAdminRoute requiredRole="admin">
                    <AdminAdmins />
                </ProtectedAdminRoute>
            } />


            {/* User Dashboard */}
            <Route path="/user-dashboard" element={
                <ProtectedUserRoute requiredRole="user">
                    <UserDashboard />
                </ProtectedUserRoute>
            } />
            <Route path="/user-dashboard/vehicles" element={
                <ProtectedUserRoute requiredRole="user">
                    <UserVehicles />
                </ProtectedUserRoute>
            } />
            <Route path="/user-dashboard/history" element={
                <ProtectedUserRoute requiredRole="user">
                    <UserHistory />
                </ProtectedUserRoute>
            } />
            <Route path="/user-dashboard/payments" element={
                <ProtectedUserRoute requiredRole="user">
                    <UserPayments />
                </ProtectedUserRoute>
            } />
            <Route path="/user-dashboard/reports" element={
                <ProtectedUserRoute requiredRole="user">
                    <UserReports />
                </ProtectedUserRoute>
            } />

        </>
    )
}

export default ProtectedRoutes