import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlinePayments } from "react-icons/md";
import { IoCarOutline } from "react-icons/io5";

const sidebar = () => {
    return (
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
                    <Link to="../user-dashboard/" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700">
                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Overview
                    </Link>

                    {/* <!-- Analytics Dropdown --> */}
                    <div class="space-y-1">
                        <button class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="true" aria-controls="analytics-dropdown">
                            <Link to="../user-dashboard/vehicles" class="flex items-center">
                                <IoCarOutline className='text-xl me-3' />
                                Vehicles
                            </Link>
                        </button>
                    </div>

                    {/* <!-- Team Dropdown --> */}
                    <div class="space-y-1">
                        <button class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="false" aria-controls="team-dropdown">
                            <Link to="../user-dashboard/history" class="flex items-center">
                                <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Parking History
                            </Link>
                        </button>
                    </div>

                    {/* <!-- Projects --> */}
                    <Link to="../user-dashboard/payments" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <MdOutlinePayments className='text-xl me-3' />
                        Payments
                    </Link>


                    {/* <!-- Documents --> */}
                    <Link to="../user-dashboard/reports" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Reports
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
    )
}

export default sidebar