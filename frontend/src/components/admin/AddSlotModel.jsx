import fetchWithToken from "@/Validation/fetchWithToken";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

const AddUserModal = ({ isOpen, onClose, onSubmit, slot }) => {
    const [formData, setFormData] = useState({
        device_id: "",
        slotNo: "",
        status: "",
    });

    const [devices, setDevices] = useState([]); // To store the list of devices
    const [loading, setLoading] = useState(false);

    // Fetch devices from the API
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/device/");
                if (response.status !== 200) throw new Error("Failed to fetch devices.");
                setDevices(response.data);
            } catch (error) {
                toast.error("Failed to fetch devices.");
            }
        };
        fetchDevices();
    }, []);

    // Populate form data if editing an existing slot
    useEffect(() => {
        if (slot) {
            setFormData({
                device_id: slot.device_id || "",
                slotNo: slot.slotNo || "",
                status: slot.status || "",
            });
        } else {
            setFormData({
                device_id: "",
                slotNo: "",
                status: "",
            });
        }
    }, [slot]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let response;
            if (slot) {
                // Update an existing slot
                response = await fetchWithToken(`http://127.0.0.1:8000/api/slot/${slot.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create a new slot
                response = await fetchWithToken("http://127.0.0.1:8000/api/slot/create/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }

            const data = await response.json();

            if (response.ok) {
                toast.success(slot ? "Slot updated successfully!" : "Slot created successfully!");
                onClose();
                onSubmit({ id: slot?.id || data.id, ...formData });
            } else {
                toast.error(data.detail || "Operation failed.");
            }
        } catch (err) {
            toast.warn("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Modal visibility class
    const modalClasses = isOpen ? "" : "hidden";

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60 ${modalClasses}`}
        >
            <div className="relative w-full max-w-xl max-h-full">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {slot ? "Edit Slot" : "Add New Slot"}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
                            ✕
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Device ID Select */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Device</label>
                                <select
                                    name="device_id"
                                    value={formData.device_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="">Select Device</option>
                                    {devices.map((device) => (
                                        <option key={device.id} value={device.id}>
                                            {device.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Slot Number Input */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Slot Number</label>
                                <input
                                    type="text"
                                    name="slotNo"
                                    value={formData.slotNo}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter slot number"
                                    required
                                />
                            </div>

                            {/* Status Select */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 text-white rounded-lg ${loading ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-800"}`}
                            >
                                {loading ? "Processing..." : slot ? "Update Slot" : "Add Slot"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;