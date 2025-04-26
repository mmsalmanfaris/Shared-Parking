import fetchWithToken from "@/Validation/fetchWithToken";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddBookingModal = ({ isOpen, onClose, onSubmit }) => {
    const [vehicles, setVehicles] = useState([]); // List of user's vehicles
    const [packages, setPackages] = useState([]); // List of available packages
    const [slots, setSlots] = useState([]); // List of available slots
    const [selectedVehicle, setSelectedVehicle] = useState(""); // Selected vehicle ID
    const [selectedPackage, setSelectedPackage] = useState(null); // Selected package details
    const [endDate, setEndDate] = useState(""); // Calculated end date
    const [selectedSlot, setSelectedSlot] = useState(""); // Selected slot ID

    const [formData, setFormData] = useState({
        vehicle_id: "", // Vehicle ID for the booking
        package_id: "",
        from_date: "",
        to_date: "",
        slot_id: "",
    });

    const [loading, setLoading] = useState(false);

    // Fetch user's vehicles, packages, and slots when the modal opens
    useEffect(() => {
        if (isOpen) {
            fetchVehicles();
            fetchPackages();
            fetchSlots();
        }
    }, [isOpen]);

    const fetchVehicles = async () => {
        try {
            const response = await fetchWithToken("http://127.0.0.1:8000/api/vehicle/user");
            const data = await response.json();
            if (response.ok) {
                setVehicles(data);
            } else {
                toast.error("Failed to fetch vehicles.");
            }
        } catch (err) {
            toast.error("An error occurred while fetching vehicles.");
        }
    };

    const fetchPackages = async () => {
        try {
            const response = await fetchWithToken("http://127.0.0.1:8000/api/package/");
            const data = await response.json();
            if (response.ok) {
                setPackages(data);
            } else {
                toast.error("Failed to fetch packages.");
            }
        } catch (err) {
            toast.error("An error occurred while fetching packages.");
        }
    };

    const fetchSlots = async () => {
        try {
            const response = await fetchWithToken("http://127.0.0.1:8000/api/slot/active");
            const data = await response.json();
            if (response.ok) {
                setSlots(data);
            } else {
                toast.error("Failed to fetch slots.");
            }
        } catch (err) {
            toast.error("An error occurred while fetching slots.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVehicleChange = (e) => {
        const vehicleId = e.target.value;
        setSelectedVehicle(vehicleId);
        setFormData((prev) => ({ ...prev, vehicle_id: vehicleId }));
    };

    const handlePackageChange = (packageId) => {
        const selectedPkg = packages.find((pkg) => pkg.id === packageId);
        setSelectedPackage(selectedPkg);
        setFormData((prev) => ({ ...prev, package_id: packageId }));

        // Calculate end date based on selected package duration
        if (formData.from_date && selectedPkg) {
            const fromDate = new Date(formData.from_date);
            fromDate.setDate(fromDate.getDate() + selectedPkg.duration);
            setEndDate(fromDate.toISOString().split("T")[0]);
            setFormData((prev) => ({ ...prev, to_date: fromDate.toISOString().split("T")[0] }));
        }
    };

    const handleDateChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Recalculate end date if a package is already selected
        if (selectedPackage) {
            const fromDate = new Date(value);
            fromDate.setDate(fromDate.getDate() + selectedPackage.duration);
            setEndDate(fromDate.toISOString().split("T")[0]);
            setFormData((prev) => ({ ...prev, to_date: fromDate.toISOString().split("T")[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetchWithToken("http://127.0.0.1:8000/api/booking/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            console.log(response.data);

            if (response.ok) {
                toast.success("Booking created successfully!");
                onClose(); // Close the modal
                onSubmit(formData); // Pass the booking data back to the parent component
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
            id="add-booking-modal"
            tabIndex="-1"
            aria-hidden={!isOpen}
            className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60 ${modalClasses}`}
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Booking</h3>
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
                                {/* Vehicle Selection */}
                                <div>
                                    <label htmlFor="vehicle_id" className="block mb-1 text-sm font-medium text-gray-700">
                                        Select Vehicle
                                    </label>
                                    <select
                                        id="vehicle_id"
                                        name="vehicle_id"
                                        value={selectedVehicle}
                                        onChange={handleVehicleChange}
                                        required
                                        className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Choose a vehicle</option>
                                        {vehicles.map((vehicle) => (
                                            <option key={vehicle.id} value={vehicle.id}>
                                                {vehicle.plate_number || "No Plate"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Package Selection */}
                                <div>
                                    <label htmlFor="package_id" className="block mb-1 text-sm font-medium text-gray-700">
                                        Select Package
                                    </label>
                                    <select
                                        id="package_id"
                                        name="package_id"
                                        value={formData.package_id}
                                        onChange={(e) => handlePackageChange(e.target.value)}
                                        required
                                        className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Choose a package</option>
                                        {packages.map((pkg) => (
                                            <option key={pkg.id} value={pkg.id}>
                                                {pkg.name} ({pkg.duration} days - Rs.{pkg.amount})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* From Date */}
                                <div>
                                    <label htmlFor="from_date" className="block mb-1 text-sm font-medium text-gray-700">
                                        From Date
                                    </label>
                                    <input
                                        type="date"
                                        id="from_date"
                                        name="from_date"
                                        value={formData.from_date}
                                        onChange={(e) => handleDateChange("from_date", e.target.value)}
                                        required
                                        className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">End Date</label>
                                    <p className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm">
                                        {endDate ? endDate : "End date here"}
                                    </p>
                                </div>

                                {/* Slot Selection */}
                                <div>
                                    <label htmlFor="slot_id" className="block mb-1 text-sm font-medium text-gray-700">
                                        Select Available Slot
                                    </label>
                                    <select
                                        id="slot_id"
                                        name="slot_id"
                                        value={selectedSlot}
                                        onChange={(e) => {
                                            setSelectedSlot(e.target.value);
                                            setFormData({ ...formData, slot_id: e.target.value });
                                        }}
                                        required
                                        className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Choose a slot</option>
                                        {slots.map((slt) => (
                                            <option key={slt.id} value={slt.id}>
                                                {slt.slotNo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`inline-flex items-center px-4 py-2 font-medium rounded-md text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
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
                                {loading ? "Processing..." : "Add Booking"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBookingModal;