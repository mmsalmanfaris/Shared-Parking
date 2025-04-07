import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import registerImage from "../assets/images/register/register.jpg";

const Register = () => {
    // Initialize form data with empty strings
    const [formData, setFormData] = useState({
        full_name: "",
        nic: "",
        address: "",
        contact: "",
        email: "",
        password: "",
        vehicle_brand: "",
        vehicle_model: "",
        car_color: "",
        plate_number: ""
    });

    // Error state for displaying error messages
    const [error, setError] = useState("");

    // Loading state to indicate form submission progress
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                alert("Registration successful!");
                window.location.href = "/login"; // Redirect to login page
            } else {
                setError(data.detail || "Registration failed. Please check your details and try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen my-20">
                <div className="flex gap-8 max-w-6xl w-full border rounded-2xl overflow-hidden">
                    {/* Form Content */}
                    <div className="p-10 flex-1">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Salman Faris"
                                        required
                                    />
                                </div>

                                {/* NIC */}
                                <div>
                                    <label htmlFor="nic" className="block mb-2 text-sm font-medium text-gray-700">
                                        National Identity Card
                                    </label>
                                    <input
                                        type="text"
                                        id="nic"
                                        name="nic"
                                        value={formData.nic}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Faris"
                                        required
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                                        House Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder=""
                                        required
                                    />
                                </div>

                                {/* Contact */}
                                <div>
                                    <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-700">
                                        Contact
                                    </label>
                                    <input
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="123-45-678"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="john.doe@company.com"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="•••••••••"
                                        required
                                    />
                                </div>

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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="ABC-1234"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-700">
                                    I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>

                    {/* Image Section */}
                    <div className="w-110 hidden lg:block">
                        <img src={registerImage} alt="Register" className="object-cover h-full w-full" />
                    </div>
                </div>
            </div>

            {/* Display Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <Footer />
        </>
    );
};

export default Register;