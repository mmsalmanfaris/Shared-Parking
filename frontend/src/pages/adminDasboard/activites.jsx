import SideBar from "@/components/admin/SideBar"
import TopBar from "@/components/admin/TopBar"
import { Link } from "react-router-dom"

const Activites = () => {
    return (
        <body class="bg-gray-100">
            <div class="flex h-screen">
                {/* <!-- Sidebar --> */}
                <aside class="w-64 bg-gray-900 text-white">
                    <SideBar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-gray-100">

                    <TopBar />

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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

            {/* <script>
                // Dropdown functionality
                document.querySelectorAll('button[aria-controls]').forEach(button => {
                    button.addEventListener('click', () => {
                        const isExpanded = button.getAttribute('aria-expanded') === 'true';
                        const dropdownContent = document.getElementById(button.getAttribute('aria-controls'));

                        button.setAttribute('aria-expanded', !isExpanded);
                        dropdownContent.classList.toggle('hidden');
                        button.querySelector('svg:last-child').classList.toggle('rotate-180');
                    });
                });
            </script> */}
        </body>
    )
}

export default Activites