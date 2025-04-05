import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdminTable from "@/components/admin/AdminTable"; // Updated basic table
import AddUserModal from "@/components/admin/AddAdminModel";
import { ImageOff } from "lucide-react";

const Admins = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Simulate fetching users from the backend
    useEffect(() => {
        setUsers([
            { id: 1, name: "John Doe", email: "john@example.com", address: "Colombo", nic: "2020125", gender: "male", time: "4/5/2025", role: "admin" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", address: "Galle", nic: "1992525268", gender: "female", time: "1/2/2025", role: "admin" },
        ]);
    }, []);

    const handleAddUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData) => {
        if (editingUser) {
            // Update existing user
            setUsers((prev) =>
                prev.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user))
            );
        } else {
            // Add new user
            setUsers((prev) => [...prev, { id: Date.now(), ...formData }]);
        }
    };

    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    return (

        <main>
            <div className="flex h-screen">
                {/* Sidebar */}
                <aside class="w-64 bg-gray-900 text-white">
                    <div class="p-4 border-b border-gray-800">
                        <div class="flex items-center justify-between">
                            <span class="text-xl font-bold ps-3">Shared Parking</span>
                        </div>
                    </div>

                    {/* <!-- Search Bar --> */}
                    <nav class="mt-5 px-2">
                        {/* <!-- Main Navigation --> */}
                        <div class="space-y-4">
                            {/* <!-- Dashboard --> */}
                            <Link to="../admin-dashboard" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Overview
                            </Link>

                            {/* <!-- Analytics Dropdown --> */}
                            <div class="space-y-1">
                                <button class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="true" aria-controls="analytics-dropdown">
                                    <Link to="../admin-dashboard/activities" class="flex items-center">
                                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Parking Activities
                                    </Link>
                                </button>
                            </div>

                            {/* <!-- Team Dropdown --> */}
                            <div class="space-y-1">
                                <button class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="false" aria-controls="team-dropdown">
                                    <Link to="../admin-dashboard/payments" class="flex items-center">
                                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Payments
                                    </Link>
                                </button>
                            </div>

                            {/* <!-- Projects --> */}
                            <Link to="../admin-dashboard/packages" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                Packages
                            </Link>

                            {/* <!-- Calendar --> */}
                            <Link to="users" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Users
                            </Link>

                            {/* <!-- Documents --> */}
                            <Link to="../admin-dashboard/reports" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Reports
                            </Link>

                            {/* <!-- Calendar --> */}
                            <Link to="../admin-dashboard/devices" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Devices & Slots
                            </Link>

                            {/* <!-- Calendar --> */}
                            <Link to="../admin-dashboard/alerts" class="flex items-center px-4 py-2.5 mb-4 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Alerts
                            </Link>
                        </div>
                    </nav>

                    {/* <!-- User Profile --> */}
                    <div class="mt-auto p-4 border-t border-gray-800">
                        <div class="flex items-center mt-2">
                            <img class="h-8 w-8 rounded-full" src="https://media.licdn.com/dms/image/v2/D5603AQHBv0rLKG2VjA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725761956615?e=1746057600&v=beta&t=ybdn6qB0UXhE4m8bChWQoFDtADV-bpwKFz0N2bVOVkg" alt="" />
                            <div class="ml-3">
                                <p class="text-sm font-medium text-white">Salman Faris</p>
                                <p class="text-xs text-gray-400">View profile</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-gray-100">
                    <div className="flex justify-between pt-5 bg-gray-800 py-4 px-6">
                        <h1 className="text-2xl font-semibold text-white">Welcome, Salman Faris!</h1>
                        <div className="">
                            <Link to="../admin-dashboard/admins" className="bg-blue-700 text-white py-2 px-4 rounded-md hover:text-black hover:shadow-2xl me-2">Admins</Link>
                            <button className="bg-red-700 text-white py-2 px-4 rounded-md hover:text-black hover:shadow-2xl">Logout</button>
                        </div>
                    </div>
                    <div className="p-6">

                        {/* Add User Button */}
                        <div className="flex justify-end"><button
                            onClick={handleAddUser}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 mb-4"
                        >
                            Add Admin
                        </button></div>

                        {/* User Table */}
                        <AdminTable users={users} />

                        {/* Add/Edit User Modal */}
                        <AddUserModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                            user={editingUser}
                        />
                    </div>
                </main>
            </div>
        </main>
    );
};

export default Admins;