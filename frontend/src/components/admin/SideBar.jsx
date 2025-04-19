import React from 'react'
import { Link } from "react-router-dom";
import { RiUserLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { IoCarOutline } from "react-icons/io5";
import { GoAlert } from "react-icons/go";
import { GoPackage } from "react-icons/go";
import { VscRadioTower } from "react-icons/vsc";
import { LuCircleParking } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";


const SideBar = () => {
    return (
        <>
            <div class="py-6 ps-7 border-b border-gray-800">
                <div class="flex items-center justify-between">
                    <span class="text-xl font-bold ps-3">Shared Parking</span>
                </div>
            </div>

            {/* <!-- Search Bar --> */}
            <nav class="mt-5 px-2">
                {/* <!-- Main Navigation --> */}
                <div class="space-y-3">
                    {/* <!-- Dashboard --> */}
                    <Link to="../admin-dashboard" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700">
                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Overview
                    </Link>

                    {/* <!-- Dashboard --> */}
                    <Link to="../admin-dashboard/bookings" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700">
                        <LuCircleParking className='text-xl me-3' />
                        Bookings
                    </Link>

                    {/* <!-- Analytics Dropdown --> */}
                    <div class="space-y-1">
                        <button class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="true" aria-controls="analytics-dropdown">
                            <Link to="../admin-dashboard/activities" class="flex items-center">
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
                            <Link to="../admin-dashboard/payments" class="flex items-center">
                                <MdOutlinePayments className='text-xl me-3' />
                                Payments
                            </Link>
                        </button>
                    </div>

                    {/* <!-- Projects --> */}
                    <Link to="../admin-dashboard/packages" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <GoPackage className='text-xl me-3' />
                        Packages
                    </Link>

                    {/* <!-- Calendar --> */}
                    <Link to="../admin-dashboard/users" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <RiUserLine className='text-xl me-3' />
                        Users
                    </Link>

                    {/* <!-- Calendar --> */}
                    <Link to="../admin-dashboard/vehicles" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <IoCarOutline className='text-xl me-3' />
                        Vehicles
                    </Link>

                    {/* <!-- Calendar --> */}
                    <Link to="../admin-dashboard/devices" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <VscRadioTower className='text-xl me-3' />
                        Devices
                    </Link>

                    {/* <!-- Calendar --> */}
                    <Link to="../admin-dashboard/slots" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <CiLocationOn className='text-xl me-3' />
                        Slots
                    </Link>

                    {/* <!-- Calendar --> */}
                    <Link to="../admin-dashboard/alerts" class="flex items-center px-4 py-2.5 mb-4 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <GoAlert className='text-xl me-3' />
                        Alerts
                    </Link>

                    {/* <!-- Documents --> */}
                    <Link to="../admin-dashboard/reports" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Reports
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default SideBar