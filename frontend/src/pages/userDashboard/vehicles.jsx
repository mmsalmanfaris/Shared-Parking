
import React, { useEffect, useState } from 'react'
import SideBar from '@/components/user/SideBar'
import TopBar from '@/components/user/topbar'
import axios from 'axios'
import { MdOutlineDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const vehicle = () => {


    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        // Fetch vehicles from your backend
        const fetchVehicles = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/vehicle");

                if (response.status !== 200) {
                    throw new Error("Failed to fetch vehicles.");
                }

                const data = response.data;
                setVehicles(data);
            } catch (error) {
                toast.error("Failed to fetch vehicles.");
                console.error(error);
            }
        };
        fetchVehicles();
    }, []);

    const handleDeleteVehicle = async (vehicleId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/vehicle/${vehicleId}`);
            toast.success("Vehicle deleted successfully!");
            setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.detail || "Failed to delete vehicle.");
        }
    };

    return (
        <body class="bg-gray-100">
            <div class="flex h-screen">

                <SideBar />

                {/* Main Content */}
                <main className="flex-1 bg-gray-100">

                    <TopBar />

                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.isArray(vehicles) && vehicles.length > 0 ? (
                                vehicles.map((v) => (
                                    <div
                                        key={v.id}
                                        className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden"
                                    >
                                        {/* Header Section */}
                                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                                            <h2 className="text-lg font-semibold text-gray-800 truncate">
                                                {v.plate_number || "No Plate"}
                                            </h2>
                                            <button
                                                onClick={() => handleDeleteVehicle(v.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                                title="Delete Vehicle"
                                            >
                                                <MdOutlineDelete size={20} />
                                            </button>
                                        </div>

                                        {/* Body Section */}
                                        <div className="p-4 space-y-2">
                                            <p className="text-sm text-gray-700 flex items-center">
                                                <span className="font-medium w-16">Brand:</span>
                                                <span className="truncate">{v.vehicle_brand || "N/A"}</span>
                                            </p>
                                            <p className="text-sm text-gray-700 flex items-center">
                                                <span className="font-medium w-16">Model:</span>
                                                <span className="truncate">{v.vehicle_model || "N/A"}</span>
                                            </p>
                                            <p className="text-sm text-gray-700 flex items-center">
                                                <span className="font-medium w-16">Color:</span>
                                                <span className="truncate">{v.vehicle_color || "N/A"}</span>
                                            </p>
                                            <p className="text-sm text-gray-700 flex items-center">
                                                <span className="font-medium w-16">Created:</span>
                                                <span className="truncate">
                                                    {v.created_at
                                                        ? new Date(v.created_at).toLocaleString()
                                                        : "N/A"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 italic">
                                    No vehicles found.
                                </p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </body>
    )
}

export default vehicle