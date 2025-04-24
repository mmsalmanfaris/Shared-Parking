import ApiReport from "@/components/admin/report/ApiReport";
import BookingReport from "@/components/admin/report/BookingReport";
import SystemReport from "@/components/admin/report/SystemReport";
import UserReport from "@/components/admin/report/UserReport";
import VehicleReport from "@/components/admin/report/VehicleReport";
import { useState } from "react";

// Import the required icon components
import { TbServerCog } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoCarOutline } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";

const ReportTabs = () => {
    const [activeTab, setActiveTab] = useState("system");

    // Define tab items with React components as icons
    const tabItems = [
        { id: "system", title: "System", icon: TbServerCog },
        { id: "users", title: "Users", icon: FaRegUser },
        { id: "vehicles", title: "Vehicles", icon: IoCarOutline },
        { id: "bookings", title: "Bookings", icon: BsCalendarDate },
        { id: "api", title: "API Usage", icon: AiOutlineBarChart },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "system": return <SystemReport />;
            case "users": return <UserReport />;
            case "vehicles": return <VehicleReport />;
            case "bookings": return <BookingReport />;
            case "api": return <ApiReport />;
            default: return null;
        }
    }

    return (
        <div class="flex h-screen">
            {/* Main Content */}
            <main className="flex-1">
                <div className="w-full">
                    {/* Tabs Header */}
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            {tabItems.map((tab) => (
                                <li className="me-2" key={tab.id}>
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${activeTab === tab.id
                                            ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                                            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                            }`}
                                    >
                                        <span className="me-2 text-xl"><tab.icon /></span>
                                        {tab.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        {renderTabContent()}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ReportTabs