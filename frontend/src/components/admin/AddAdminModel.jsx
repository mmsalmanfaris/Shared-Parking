import fetchWithToken from "@/Validation/fetchWithToken";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const AddAdminModal = ({ isOpen, onClose, onSubmit, user }) => {

    console.log(user);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        nic: "",
        gender: "",
        email: "",
        password: "",
    });

    // Update formData when the user prop changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                address: user.address || "",
                nic: user.nic || "",
                gender: user.gender || "",
                email: user.email || "",
                password: user.password || "",
            });
        } else {
            // Reset form data if no user is provided (e.g., for adding a new admin)
            setFormData({
                name: "",
                address: "",
                nic: "",
                gender: "",
                email: "",
                password: "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let response;

            if (user) {
                // Update existing admin
                response = await fetchWithToken(`http://127.0.0.1:8000/api/admin/${user.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                // Add new admin
                response = await fetchWithToken("http://127.0.0.1:8000/api/admin/register/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }

            const data = await response.json();

            if (response.ok) {
                toast.success(user ? "Admin updated successfully!" : "Admin created successfully!");
                onClose(); // Close the modal
                onSubmit({ id: user?.id || data.Admin_Id, ...formData }); // ✅ call parent handle
            } else {
                toast.error(data.detail || "Operation failed.");
            }
        } catch (err) {
            toast.warn("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const modalClasses = isOpen ? "" : "hidden";

    return (
        <>
            {/* Main Modal */}
            <div
                id="large-modal"
                tabIndex="-1"
                aria-hidden={!isOpen}
                className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60 transform-view ${modalClasses}`}
            >
                <div className="relative w-full max-w-4xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {user ? "Edit Admin" : "Add New Admin"}
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onClose}
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
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Enter name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Enter address"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="nic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            NIC
                                        </label>
                                        <input
                                            type="text"
                                            name="nic"
                                            id="nic"
                                            value={formData.nic}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Enter NIC"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="name@gmail.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="*********"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`inline-flex items-center px-4 py-2 font-medium rounded-md text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 "
                                        }`}
                                >
                                    {loading && (
                                        <svg
                                            className="mr-3 size-5 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    )}
                                    {loading ? "Processing..." : user ? "Save Chaneges" : "Add Admin"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAdminModal;