import fetchWithToken from "@/Validation/fetchWithToken";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddVehicleModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        vehicle_brand: "",
        vehicle_model: "",
        car_color: "",
        plate_number: "",
    });

    console.log(formData);

    useEffect(() => {
        // Clear the form when modal is opened
        if (isOpen) {
            setFormData({
                vehicle_brand: "",
                vehicle_model: "",
                car_color: "",
                plate_number: "",
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetchWithToken("http://127.0.0.1:8000/api/vehicle/user/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Vehicle added successfully!");
                onClose(); // Close the modal
                onSubmit(formData); // Send response back to parent
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
            id="add-vehicle-modal"
            tabIndex="-1"
            aria-hidden={!isOpen}
            className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60 ${modalClasses}`}
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add New Vehicle
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
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

                    {/* Body */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                {/* Vehicle Brand */}
                                <div>
                                    <label htmlFor="vehicle_brand" className="block mb-2 text-sm font-medium text-gray-700">
                                        Vehicle Brand
                                    </label>
                                    <input
                                        type="text"
                                        id="vehicle_brand"
                                        name="vehicle_brand"
                                        value={formData.vehicle_brand}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Toyota"
                                        required
                                    />
                                </div>

                                {/* Vehicle Model */}
                                <div>
                                    <label htmlFor="vehicle_model" className="block mb-2 text-sm font-medium text-gray-700">
                                        Vehicle Model
                                    </label>
                                    <input
                                        type="text"
                                        id="vehicle_model"
                                        name="vehicle_model"
                                        value={formData.vehicle_model}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Corolla"
                                        required
                                    />
                                </div>

                                {/* Car Color */}
                                <div>
                                    <label htmlFor="car_color" className="block mb-2 text-sm font-medium text-gray-700">
                                        Car Color
                                    </label>
                                    <input
                                        type="text"
                                        id="car_color"
                                        name="car_color"
                                        value={formData.car_color}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Red"
                                        required
                                    />
                                </div>

                                {/* Plate Number */}
                                <div>
                                    <label htmlFor="plate_number" className="block mb-2 text-sm font-medium text-gray-700">
                                        Plate Number
                                    </label>
                                    <input
                                        type="text"
                                        id="plate_number"
                                        name="plate_number"
                                        value={formData.plate_number}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="ABC-1234"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`inline-flex items-center px-4 py-2 font-medium rounded-md text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
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
                                {loading ? "Processing..." : "Add Vehicle"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVehicleModal;
