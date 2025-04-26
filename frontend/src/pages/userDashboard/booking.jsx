import React, { useEffect, useState } from 'react';
import SideBar from '@/components/user/SideBar';
import TopBar from '@/components/user/topbar';
import axios from 'axios';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddBookingModal from '@/components/user/AddBookingModal';

const Booking = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://127.0.0.1:8000/api/booking/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status !== 200) {
                    throw new Error("Failed to fetch vehicles.");
                }
                setVehicles(response.data);
            } catch (error) {
                toast.error("Failed to fetch vehicles.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);



    const handleSubmit = (formData) => {
        setVehicles((prev) => [...prev, { id: Date.now(), ...formData }]);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-100">
            <div className="flex h-screen">
                <SideBar />
                {/* Main Content */}
                <main className="flex-1 bg-gray-100">
                    <TopBar />
                    <div className="p-6">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 mb-4"
                            >
                                Add Booking
                            </button>
                        </div>

                        <AddBookingModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                        />

                        {/* Table Section */}
                        {loading ? (
                            <div className="text-center py-6">
                                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        ) : vehicles.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Plate Number</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Booking Code</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Package</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Slot</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Active</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Payment</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">From</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">To</th>
                                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {vehicles.map((v) => (
                                            <tr key={v.id} className="hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.vehicle || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.booking_code || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.package || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.slot || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.is_active || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.payment_status || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.from_date || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{v.to_date || "N/A"}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">
                                                    {v.created_at ? new Date(v.created_at).toLocaleString() : "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-6">No vehicles found.</div>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
};

export default Booking;