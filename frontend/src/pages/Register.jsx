import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import registerImage from "../assets/images/register/register.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        nic: "",
        address: "",
        contact: "",
        email: "",
        password: "",
        vehicle_brand: "",
        vehicle_model: "",
        car_color: "",
        plate_number: "",
        package_id: "",
        from_date: "",
        to_date: "",
        slot_id: ""
    });

    console.log(formData);

    const [loading, setLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [endDate, setEndDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [Slots, setSlots] = useState([]);
    const [packages, setPackages] = useState([]);


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/package/");

                if (response.status !== 200) {
                    throw new Error("Failed to fetch packages.");
                }
                setPackages(response.data);
            } catch (error) {
                toast.error("Failed to fetch packages.");
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);


    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/slot/active/");

                if (response.status !== 200) {
                    throw new Error("Failed to fetch slots.");
                }
                setSlots(response.data);
            } catch (error) {
                toast.error("Failed to fetch slots.");
            } finally {
                setLoading(false);
            }
        };
        fetchSlots();
    }, []);


    const handleDateChange = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            [type]: value,
        }));

        if (type === "from_date" && selectedPackage) {
            const startDate = new Date(value);
            if (isNaN(startDate)) {
                toast.error("Invalid start date.");
                return;
            }

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + selectedPackage.duration - 1);

            const formattedEndDate = endDate.toISOString().split("T")[0];
            setEndDate(formattedEndDate);

            setFormData((prev) => ({
                ...prev,
                to_date: formattedEndDate,
            }));
        }
    };


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Move to the next step
    const nextStep = () => {
        if (step === 1) {
            // Validate personal details before proceeding
            if (!formData.name || !formData.nic || !formData.address || !formData.contact || !formData.email || !formData.password) {
                toast.warning("Please fill all personal details.");
                return;
            }
        }
        setStep(step + 1);

        if (step === 2) {
            // Validate personal details before proceeding
            if (!formData.vehicle_brand || !formData.vehicle_model || !formData.car_color || !formData.plate_number || !formData.package_id || !from || !to || !form.slot_id) {
                toast.warning("Please fill all personal details.");
                return;
            }
        }
        setStep(step + 1);
    };

    // Move to the previous step
    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Start loading

        try {
            // Send registration request to FastAPI backend
            const response = await fetch("http://127.0.0.1:8000/api/user/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                toast.success("Registration Success", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });

                setTimeout(() => {
                    window.location.href = "/login"; // Redirect to login page
                }, 1200);
            } else {
                // Show error message
                toast.warning("Registration Failed. Try again!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (err) {
            // Show error message
            toast.error("Check Your Internet & Try again!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handlePackageChange = (packageId) => {
        const selected = packages.find((pkg) => pkg.id === packageId);
        if (selected) {
            setSelectedPackage(selected);
            setFormData((prev) => ({
                ...prev,
                package_id: selected.id,
            }));
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 py-25">
                <div className="w-full max-w-4xl bg-white rounded-lg border overflow-hidden flex">
                    {/* Form Section */}
                    <div className="w-full p-8">

                        {/* Step 1: Personal Details */}
                        {step === 1 && (
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-6  p-5">
                                <h2 className="text-xl font-semibold text-gray-800 mb-8">Step 1: Personal Details</h2>

                                {/* Name & NIC */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
                                        <input
                                            type="text"
                                            id="nic"
                                            name="nic"
                                            value={formData.nic}
                                            onChange={handleChange}
                                            placeholder="123456789V"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Address & Contact */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Colombo"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                                        <input
                                            type="text"
                                            id="contact"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            placeholder="+94771234567"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Email & Password */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="•••••••••"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Next Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg text-sm transition duration-200 w-25"
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>

                        )}

                        {/* Step 2: Vehicle Details & Package Selection */}
                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl mx-auto bg-white p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Vehicle Details & Package</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Vehicle Brand */}
                                    <div>
                                        <label htmlFor="vehicle_brand" className="block mb-1 text-sm font-medium text-gray-700">Vehicle Brand</label>
                                        <input
                                            type="text"
                                            id="vehicle_brand"
                                            name="vehicle_brand"
                                            value={formData.vehicle_brand}
                                            onChange={handleChange}
                                            placeholder="Toyota"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    {/* Vehicle Model */}
                                    <div>
                                        <label htmlFor="vehicle_model" className="block mb-1 text-sm font-medium text-gray-700">Vehicle Model</label>
                                        <input
                                            type="text"
                                            id="vehicle_model"
                                            name="vehicle_model"
                                            value={formData.vehicle_model}
                                            onChange={handleChange}
                                            placeholder="Corolla"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    {/* Car Color */}
                                    <div>
                                        <label htmlFor="car_color" className="block mb-1 text-sm font-medium text-gray-700">Car Color</label>
                                        <input
                                            type="text"
                                            id="car_color"
                                            name="car_color"
                                            value={formData.car_color}
                                            onChange={handleChange}
                                            placeholder="Red"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    {/* Plate Number */}
                                    <div>
                                        <label htmlFor="plate_number" className="block mb-1 text-sm font-medium text-gray-700">Plate Number</label>
                                        <input
                                            type="text"
                                            id="plate_number"
                                            name="plate_number"
                                            value={formData.plate_number}
                                            onChange={handleChange}
                                            placeholder="ABC123"
                                            required
                                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    {/* Package Selection */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="package_id" className="block mb-1 text-sm font-medium text-gray-700">
                                            Select Package
                                        </label>
                                        <select
                                            id="package_id"
                                            name="package_id"
                                            value={formData.package_id} // Use the package ID from formData
                                            onChange={(e) => handlePackageChange(e.target.value)} // Call the handler
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

                                    <div className="flex w-full md:col-span-2 ">
                                        {/* From Date */}
                                        <div>
                                            <label htmlFor="fromDate" className="block mb-1 text-sm font-medium text-gray-700">From Date</label>
                                            <input
                                                type="date"
                                                id="fromDate"
                                                value={formData.from_date}
                                                onChange={(e) => handleDateChange("from_date", e.target.value)}
                                                required
                                                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            />
                                        </div>

                                        <div className="ms-5 w-full">
                                            {(
                                                <div>
                                                    <label className="block mb-1 text-sm font-medium text-gray-700">End Date</label>
                                                    <p className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"> {endDate ? endDate : "End date here"}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ms-5 w-full">
                                            {(
                                                <div>
                                                    <label className="block mb-1 text-sm font-medium text-gray-700">Total Days</label>
                                                    <p className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"> {selectedPackage ? selectedPackage.duration : 0}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Package Selection */}
                                    <div className="md:col-span-2">
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
                                            {Slots.map((slt) => (
                                                <option key={slt.id} value={slt.id}>
                                                    {slt.slotNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    {/* Terms & Conditions */}
                                    <div className="md:col-span-2 flex items-start mt-2">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500"
                                            required
                                        />
                                        <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-700">
                                            I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
                                        </label>
                                    </div>
                                </div>


                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-6 py-2"
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-6 py-2"
                                        disabled={loading}
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>

                    {/* Image Section */}
                    <div className="w-110 hidden lg:block">
                        <img src={registerImage} alt="Register" className="object-cover h-full w-full" />
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default Register;