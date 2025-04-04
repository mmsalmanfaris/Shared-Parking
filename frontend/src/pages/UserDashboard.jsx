import React from "react";

const UserDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white">
                <div className="p-4 border-b border-gray-800">
                    <h1 className="text-xl font-bold">Shared Parking</h1>
                </div>
                <nav className="mt-5 px-2">
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="#profile"
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                                <svg
                                    className="h-5 w-5 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="#vehicles"
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                                <svg
                                    className="h-5 w-5 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z"
                                    />
                                </svg>
                                Vehicles
                            </a>
                        </li>
                        <li>
                            <a
                                href="#history"
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                                <svg
                                    className="h-5 w-5 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                    />
                                </svg>
                                Parking History
                            </a>
                        </li>
                        <li>
                            <a
                                href="#payments"
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                                <svg
                                    className="h-5 w-5 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                                Payments
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto p-4 border-t border-gray-800">
                    <div className="flex items-center">
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://media.licdn.com/dms/image/v2/D5603AQHBv0rLKG2VjA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725761956615?e=1746057600&v=beta&t=ybdn6qB0UXhE4m8bChWQoFDtADV-bpwKFz0N2bVOVkg"
                            alt="User Profile"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium">Salman Faris</p>
                            <p className="text-xs text-gray-400">View profile</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-semibold text-gray-900">Welcome, Salman Faris!</h1>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-medium text-gray-800">Profile</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Full Name: Salman Faris <br />
                            Email: salman@gmail.com <br />
                            Contact: +94 761 754 242
                        </p>
                    </div>

                    {/* Vehicles Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-medium text-gray-800">Vehicles</h2>
                        <ul className="mt-2 space-y-2">
                            <li className="text-sm text-gray-600">
                                BMW X5 (Red, Plate: ABC123)
                            </li>
                            <li className="text-sm text-gray-600">
                                Toyota Corolla (Blue, Plate: XYZ789)
                            </li>
                        </ul>
                    </div>

                    {/* Parking History Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-medium text-gray-800">Parking History</h2>
                        <ul className="mt-2 space-y-2">
                            <li className="text-sm text-gray-600">
                                2023-10-01 | Colombo Central | 2 hours
                            </li>
                            <li className="text-sm text-gray-600">
                                2023-09-28 | Kandy Mall | 1 hour
                            </li>
                        </ul>
                    </div>

                    {/* Payments Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-medium text-gray-800">Payments</h2>
                        <ul className="mt-2 space-y-2">
                            <li className="text-sm text-gray-600">
                                2023-10-01 | $10 | Paid
                            </li>
                            <li className="text-sm text-gray-600">
                                2023-09-28 | $5 | Paid
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;