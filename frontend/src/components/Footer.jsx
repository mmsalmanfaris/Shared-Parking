import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Content Section */}
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Packages</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Contact Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Login</a>
                            </li>
                        </ul>
                    </div>

                    {/* Help Center Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Help Center</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Discord Server</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Twitter</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Facebook</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">WhatsApp</a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>

                    {/* Pricing Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Pricing</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">iOS</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">FAQ</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Locations</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors duration-300">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-gray-950">
                <div className="mx-auto max-w-screen-xl px-4 py-6 flex flex-col items-center justify-between sm:flex-row">
                    {/* Copyright Text */}
                    <p className="text-sm text-gray-400 text-center sm:text-left">
                        © 2025 <a href="https://flowbite.com/" className="hover:text-gray-300 transition-colors duration-300">mmsalmanfaris</a>. All Rights Reserved.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
                            <FaFacebook />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
                            <FaSquareInstagram />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;