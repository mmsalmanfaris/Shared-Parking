import AddUserModel from "@/components/admin/AddUserModel"
import SideBar from "@/components/admin/SideBar"
import TopBar from "@/components/admin/TopBar"
import UserTable from "@/components/admin/UserTable"
import fetchWithToken from "@/Validation/fetchWithToken"
import { useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/user/")
                if (!response) {
                    throw new Error("Failed to fetch Users");
                }
                const data = await response.json()
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };
        fetchUsers();
    }, [])

    const handleAddUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteConfirmation = (id) => {
        setUserToDelete(id);
        const modal = document.getElementById("popup-modal");
        modal.classList.remove("hidden");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData) => {
        if (editingUser) {
            // Update existing user in the local state
            setUsers((prev) =>
                prev.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user))
            );
        } else {
            // Add new user to the local state
            setUsers((prev) => [...prev, { id: Date.now(), ...formData }]);
        }
    };

    const handleDeleteUser = async () => {
        try {
            // Make a DELETE request to the backend
            const id = userToDelete;
            const response = await axios.delete(`http://127.0.0.1:8000/api/user/${id}`);
            console.log(response.data.message); // Log success message

            // Remove from the local state
            setUsers((prev) => prev.filter((user) => user.id !== id));

            // Show success message
            toast.success("User deleted successfully!", {
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
            setUserToDelete(null);

        } catch (error) {
            console.error("Error deleting admin:", error.response?.data || error.message);

            // Show error message
            toast.error(error.response?.data?.detail || "An error occurred while deleting the user.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };



    return (
        <div class="flex h-screen">
            {/* <!-- Sidebar --> */}
            <aside class="w-64 bg-gray-900 text-white">
                <SideBar />
            </aside>

            {/* <!-- Main Content --> */}
            <main class="flex-1  bg-gray-100">
                <TopBar />

                <div className="p-6">

                    <div className="flex justify-end">
                        <button
                            onClick={handleAddUser}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 mb-4">Add User</button>
                    </div>

                    <UserTable
                        users={users}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteConfirmation}
                    />

                    <AddUserModel
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmit}
                        user={editingUser}
                    />

                </div>

                {/* Delete Modal */}
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
    )
}

export default Users