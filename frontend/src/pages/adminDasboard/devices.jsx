import AddDeviceModel from "@/components/admin/AddDeviceModel";
import SideBar from "@/components/admin/SideBar";
import TopBar from "@/components/admin/TopBar";
import DeviceTable from "@/components/admin/DeviceTable";
import fetchWithToken from "@/Validation/fetchWithToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Devices = () => {


    const [devices, setDevices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDevice, setEditingDevice] = useState(null);
    const [deviceToDelete, setDeviceToDelete] = useState(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/device/");
                const data = await response.json();
                setDevices(data);
            } catch (error) {
                console.error("Error fetching devices:", error.message);
            }
        };

        fetchDevices();
    }, []);

    const handleAddDevice = () => {
        setEditingDevice(null);
        setIsModalOpen(true);
    };

    const handleEditDevice = (device) => {
        setEditingDevice(device);
        setIsModalOpen(true);
    };

    const handleDeleteConfirmation = (id) => {
        setDeviceToDelete(id);
        document.getElementById("popup-modal").classList.remove("hidden");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData) => {
        if (editingDevice) {
            setDevices((prev) =>
                prev.map((device) => (device.id === editingDevice.id ? { ...device, ...formData } : device))
            );
        } else {
            setDevices((prev) => [...prev, { id: Date.now(), ...formData }]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteDevice = async () => {
        try {
            const id = deviceToDelete;
            await axios.delete(`http://127.0.0.1:8000/api/device/${id}`);

            setDevices((prev) => prev.filter((device) => device.id !== id));

            toast.success("Device deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
            });

            document.getElementById("popup-modal").classList.add("hidden");
            setDeviceToDelete(null);
        } catch (error) {
            console.error("Error deleting device:", error.response?.data || error.message);
            toast.error("Failed to delete device.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-900 text-white">
                <SideBar />
            </aside>

            <main className="flex-1 bg-gray-100">
                <TopBar />
                <div className="p-6">
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddDevice}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 mb-4"
                        >
                            Add Device
                        </button>
                    </div>

                    <DeviceTable
                        devices={devices}
                        onEdit={handleEditDevice}
                        onDelete={handleDeleteConfirmation}
                    />

                    <AddDeviceModel
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmit}
                        device={editingDevice}
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
                                    Are you sure you want to delete this device?
                                </h3>
                                <button
                                    onClick={handleDeleteDevice}
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
    );
};

export default Devices;
