import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import Footer from "@/components/Footer"
import Header from "@/components/Header"

import { MdOutlineDataSaverOff } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaEnvira } from "react-icons/fa";

import hero from "../assets/images/landing/hero.jpg"

const Home = () => {

    const [loading, setLoading] = useState(true);
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
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    return (
        <>
            <Header />

            <div className="bg-white dark:bg-gray-900 flex relative z-20 items-center overflow-hidden">
                <div className="container mx-auto px-6 py-16 sm:py-24">
                    <div className="flex flex-col-reverse sm:flex-row justify-between items-center">
                        {/* Left Content */}
                        <div className="sm:w-1/2 lg:w-2/5 flex flex-col space-y-8 mt-8 sm:mt-0">
                            {/* Highlight Bar */}
                            <span className="w-20 h-1 bg-blue-600 dark:bg-pink-500"></span>

                            {/* Title */}
                            <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight text-gray-800 dark:text-white">
                                Automated <br />
                                <span className="text-4xl sm:text-5xl lg:text-6xl text-blue-600">Parking</span>
                            </h1>

                            {/* Description */}
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                                Effortless parking starts here! Our innovative system ensures a seamless and secure parking experience with advanced technology. No more searching for spaces.
                            </p>

                            {/* Buttons */}
                            <div className="flex space-x-4">
                                <Link
                                    to={"/contact"}
                                    className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-pink-500 rounded-lg transition-colors duration-300"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    to={"/packages"}
                                    className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium text-blue-600 dark:text-white bg-transparent border border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    View Packages
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="sm:w-1/3 lg:w-2/5 mt-8 sm:mt-0">
                            <img
                                src={hero}
                                alt="Automated Parking System"
                                className="max-w-full sm:max-w-md lg:max-w-lg mx-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                    {/* Title and Description */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose Automated Parking?
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                            Discover the benefits of our innovative automated parking system designed to make your life easier.
                        </p>
                    </div>

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1: Time-Saving */}
                        <div className="bg-white border rounded-2xl">
                            <div className="p-6 text-center">
                                <div className="flex justify-center mb-6">
                                    <MdOutlineDataSaverOff className="text-5xl text-blue-700" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Save Time
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Our automated system eliminates the need to search for parking spots, saving you valuable time.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Enhanced Security */}
                        <div className="bg-white border rounded-2xl">
                            <div className="p-6 text-center">
                                <div className="flex justify-center mb-6">
                                    <MdOutlineSecurity className="text-5xl text-blue-700" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Enhanced Security
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Your vehicle is stored in a secure, monitored environment, ensuring peace of mind.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Eco-Friendly */}
                        <div className="bg-white border rounded-2xl">
                            <div className="p-6 text-center">
                                <div className="flex justify-center mb-6">
                                    <FaEnvira className="text-5xl text-blue-700" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Eco-Friendly
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Reduce emissions by minimizing idle time and optimizing parking space usage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 my-15">
                <div className="gap-16 items-center py-20 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    {/* Right Images */}
                    <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
                        {/* Image 1 */}
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Seamless Parking Solution"
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Image 2 */}
                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1661502715768-a25053963716?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Smart Parking Technology"
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>
                    {/* Left Content */}
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-300">
                        <h2 className="mb-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Seamless Parking, <br />
                            <span className="text-blue-600 dark:text-pink-500">Smarter Experience.</span>
                        </h2>
                        <p className="mb-6 text-base sm:text-lg">
                            We are strategists, designers, and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.
                        </p>
                        <p className="text-sm sm:text-base">
                            We are strategists, designers, and developers. Innovators and problem solvers. Small enough to be simple and quick.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div class="space-y-5 px-8 py-12 ms-28 my-20 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our effortable parking packages
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                            Discover the benefits of our innovative automated parking system designed to make your life easier.
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center col-span-full py-6">
                            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    ) : packages.length > 0 ? (
                        <div className="demo-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {packages.slice(0, 3).map((p) => (
                                <div key={p.id}
                                    class="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative">
                                    <div class="h-full z-10 relative">
                                        <div class="flex flex-col flex-1 justify-between h-full space-y-5">
                                            <div class="flex justify-between flex-col">
                                                <div class="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                                                    <span>{p.name}</span>
                                                </div>
                                                <div class="pt-5 text-gray-500 font-medium text-base space-y-1">
                                                    <div class="flex items-center align-bottom"><span class="pt-1.5">Rs.</span>
                                                        <div class="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900"><span>{p.amount ? p.amount : "Free"}</span>
                                                        </div><span class="pt-1.5 fon">{p.duration} days</span>
                                                    </div>
                                                    <span className="font-light">{p.description}</span>
                                                </div>
                                            </div>
                                            <div class="pt-2">
                                                <Link to="/packages"
                                                    class="inline-flex items-center group space-x-2.5 bg-blue-700 text-white py-4 px-5 rounded-2xl cursor-pointer"><span
                                                        class="w-full font-semibold text-base">Select Package</span>
                                                    <svg class="inline-block h-6" viewBox="0 0 24 25" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">No packages found.</div>
                    )}
                </div>
            </section>



            <Footer />
        </>
    )
}

export default Home