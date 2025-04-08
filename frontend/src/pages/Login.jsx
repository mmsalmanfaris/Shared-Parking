import React, { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import loginImage from "../assets/images/login/login.webp";
import { auth, signInWithEmailAndPassword } from "../../firebase";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send the user's ID token to the backend for verification
            const idToken = await user.getIdToken();
            const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.access_token); // Store the token
                localStorage.setItem("user", JSON.stringify(data.user)); // Store user details (optional)
                if (data.user["role"] === "admin") {
                    window.location.href = "/admin-dashboard";
                } else if (data.user["role"] === "user") {
                    window.location.href = "/user-dashboard";
                }
            } else {
                setError(data.detail || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };


    return (
        <>
            <Header />

            <div className="flex justify-center items-center min-h-screen">
                <form onSubmit={handleSubmit} className="flex gap-8 max-w-6xl w-full bg-white border rounded-2xl overflow-hidden">
                    {/* Form Content */}
                    <div className="p-10 flex-1 pt-17">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Login to Your Account</h1>
                        <div className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="john.doe@company.com"
                                    required
                                />
                            </div>
                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="•••••••••"
                                    required
                                />
                            </div>
                            {/* Remember Me Checkbox */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                    />
                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-700">
                                        Remember Me
                                    </label>
                                </div>
                                <a href="forget-password" className="text-sm text-blue-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                            >
                                Login
                            </button>
                            {/* Sign Up Link */}
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <a href="register" className="text-blue-600 hover:underline">
                                    Sign up here
                                </a>
                            </p>
                        </div>
                    </div>
                    {/* Image Section */}
                    <div className="w-lg hidden lg:block">
                        <img src={loginImage} alt="Login" className="object-cover h-full w-full" />
                    </div>
                </form>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <Footer />
        </>
    );
};

export default Login;