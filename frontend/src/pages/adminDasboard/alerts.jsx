import { Link } from "react-router-dom"

const Alerts = () => {
    return (
        <body class="bg-gray-100">
            <div class="flex h-screen">
                {/* <!-- Sidebar --> */}
                <aside class="w-64 bg-gray-900 text-white">
                    <div class="p-4 border-b border-gray-800">
                        <div class="flex items-center justify-between">
                            <span class="text-xl font-bold ps-3">Shared Parking</span>
                        </div>
                    </div>

                    {/* <!-- Search Bar --> */}
                    <nav class="mt-5 px-2">
                        {/* <!-- Main Navigation --> */}
                        <div class="space-y-4">
                            {/* <!-- Dashboard --> */}
                            <Link to="./overview" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Overview
                            </Link>

                            {/* <!-- Analytics Dropdown --> */}
                            <div class="space-y-1">
                                <button class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="true" aria-controls="analytics-dropdown">
                                    <Link to="./activities" class="flex items-center">
                                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Parking Activities
                                    </Link>
                                </button>
                            </div>

                            {/* <!-- Team Dropdown --> */}
                            <div class="space-y-1">
                                <button class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="false" aria-controls="team-dropdown">
                                    <Link to="./payments" class="flex items-center">
                                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Payments
                                    </Link>
                                </button>
                            </div>

                            {/* <!-- Projects --> */}
                            <Link to="./packages" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                Packages
                            </Link>

                            {/* <!-- Calendar --> */}
                            <Link to="users" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Users
                            </Link>

                            {/* <!-- Documents --> */}
                            <Link to="./reports" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Reports
                            </Link>

                            {/* <!-- Calendar --> */}
                            <Link to="./devices" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Devices & Slots
                            </Link>

                            {/* <!-- Calendar --> */}
                            <Link to="./" class="flex items-center px-4 py-2.5 mb-4 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Alerts
                            </Link>
                        </div>
                    </nav>

                    {/* <!-- User Profile --> */}
                    <div class="mt-auto p-4 border-t border-gray-800">
                        <div class="flex items-center mt-2">
                            <img class="h-8 w-8 rounded-full" src="https://media.licdn.com/dms/image/v2/D5603AQHBv0rLKG2VjA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725761956615?e=1746057600&v=beta&t=ybdn6qB0UXhE4m8bChWQoFDtADV-bpwKFz0N2bVOVkg" alt="" />
                            <div class="ml-3">
                                <p class="text-sm font-medium text-white">Salman Faris</p>
                                <p class="text-xs text-gray-400">View profile</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* <!-- Main Content --> */}
                <main class="flex-1 p-6 bg-gray-100">
                    <h1 class="text-2xl font-semibold text-gray-900">Dashboard Alerts</h1>
                    <div class="mt-4 p-6 bg-white rounded-lg shadow-md">
                        <p class="text-gray-600">This is a dark sidebar example with submenus.</p>
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

export default Alerts