import fetchWithToken from "@/Validation/fetchWithToken";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

const AddUserModal = ({ isOpen, onClose, onSubmit, device }) => {
    const [formData, setFormData] = useState({
        name: "",
        type_id: "",
    });

    const [devicetypes, setDeviceTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDeviceType = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/device/type/");
                if (response.status !== 200) throw new Error("Failed to fetch device types.");
                setDeviceTypes(response.data);
            } catch (error) {
                toast.error("Failed to fetch device types.");
            }
        };
        fetchDeviceType();
    }, []);

    useEffect(() => {
        if (device) {
            setFormData({
                name: device.name || "",
                type_id: device.type_id || "",
            });
        } else {
            setFormData({
                name: "",
                type_id: "",
            });
        }
    }, [device]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let response;
            if (device) {
                response = await fetchWithToken(`http://127.0.0.1:8000/api/device/${device.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                response = await fetchWithToken("http://127.0.0.1:8000/api/device/create/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }

            const data = await response.json();

            if (response.ok) {
                toast.success(device ? "Device updated successfully!" : "Device created successfully!");
                onClose();
                onSubmit({ id: device?.id || data.id, ...formData });
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
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60 ${modalClasses}`}
        >
            <div className="relative w-full max-w-xl max-h-full">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {device ? "Edit Device" : "Add New Device"}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
                            ✕
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Device Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Device Type</label>
                                <select
                                    name="type_id"
                                    value={formData.type_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="">Select Type</option>
                                    {devicetypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 text-white rounded-lg ${loading ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-800"}`}
                            >
                                {loading ? "Processing..." : device ? "Update Device" : "Add Device"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
