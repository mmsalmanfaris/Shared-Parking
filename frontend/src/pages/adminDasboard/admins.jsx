import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdminTable from "@/components/admin/AdminTable"; // Updated basic table
import AddUserModal from "@/components/admin/AddAdminModel";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admins = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [adminToDelete, setAdminToDelete] = useState(null);

    // Simulate fetching users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/admin/");
                if (!response.ok) {
                    throw new Error("Failed to fetch admins");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching admins:", error.message);
            }
        };
        fetchUsers();
    }, []);

    // Handle Delete Confirmation
    const handleDeleteConfirmation = (id) => {
        setAdminToDelete(id); // Store the ID of the admin to delete
        const modal = document.getElementById("popup-modal");
        modal.classList.remove("hidden"); // Show the modal
        // handleDeleteUser();
    };

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

    const handleDeleteUser = async () => {
        try {
            // Make a DELETE request to the backend
            const id = adminToDelete;
            const response = await axios.delete(`http://127.0.0.1:8000/api/admin/${id}`);
            console.log(response.data.message); // Log success message

            // Remove the admin from the local state
            setUsers((prev) => prev.filter((user) => user.id !== id));

            // Show success message
            toast.success("Admin deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });

            // Hide the modal
            const modal = document.getElementById("popup-modal");
            modal.classList.add("hidden");

            // Clear the adminToDelete state
            setAdminToDelete(null);

        } catch (error) {
            console.error("Error deleting admin:", error.response?.data || error.message);

            // Show error message
            toast.error(error.response?.data?.detail || "An error occurred while deleting the admin.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
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
                        <AdminTable
                            users={users}
                            onEdit={handleEditUser}
                            onDelete={handleDeleteConfirmation}
                        />

                        {/* Add/Edit User Modal */}
                        <AddUserModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                            user={editingUser}
                        />
                    </div>

                    {/* Confirmation Modal */}
                    <div
                        id="popup-modal"
                        className="hidden overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full h-full bg-black/60  md:inset-0 h-[calc(100%-1rem)] "
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <button
                                    type="button"
                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        const modal = document.getElementById("popup-modal");
                                        modal.classList.add("hidden");
                                    }}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg
                                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this admin?
                                    </h3>
                                    <button
                                        onClick={handleDeleteUser}
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                    >
                                        Yes, I'm sure
                                    </button>
                                    <button
                                        onClick={() => {
                                            const modal = document.getElementById("popup-modal");
                                            modal.classList.add("hidden");
                                        }}
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </main>
    );
};

export default Admins;