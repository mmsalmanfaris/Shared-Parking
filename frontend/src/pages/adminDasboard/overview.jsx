import React, { useEffect, useState } from "react";
import SideBar from "@/components/admin/SideBar";
import TopBar from "@/components/admin/TopBar";
import fetchWithToken from "@/Validation/fetchWithToken";
import {
    FaUser,
    FaCar,
    FaCalendarCheck,
    FaBell,
    FaChartBar,
} from "react-icons/fa";

const Overview = () => {
    const [usersData, setUsersData] = useState([]);
    const [vehiclesData, setVehiclesData] = useState([]);
    const [bookingsData, setBookingsData] = useState([]);
    const [alertsData, setAlertsData] = useState([]);
    const [apiUsageData, setApiUsageData] = useState([]);
    const [devicesData, setDevicesData] = useState([]);
    const [userActivitiesData, setUserActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [
                    usersRes,
                    vehiclesRes,
                    bookingsRes,
                    alertsRes,
                    apiUsageRes,
                    devicesRes,
                    activitiesRes,
                ] = await Promise.all([
                    fetchWithToken("http://127.0.0.1:8000/api/report/overview/users"),
                    fetchWithToken("http://127.0.0.1:8000/api/report/overview/vehicles"),
                    fetchWithToken("http://127.0.0.1:8000/api/report/overview/bookings"),
                    fetchWithToken("http://127.0.0.1:8000/api/report/overview/alerts"),
                    fetchWithToken("http://127.0.0.1:8000/api/report/overview/api-usage"),
                    fetchWithToken("http://127.0.0.1:8000/api/report/overview/devices"),
                    fetchWithToken("http://127.0.0.1:8000/api/report/overview/activites"),
                ]);

                setUsersData(await usersRes.json());
                setVehiclesData(await vehiclesRes.json());
                setBookingsData(await bookingsRes.json());
                setAlertsData(await alertsRes.json());
                setApiUsageData(await apiUsageRes.json());
                setDevicesData(await devicesRes.json());
                setUserActivitiesData(await activitiesRes.json());
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white shadow-md">
                <SideBar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <TopBar />

                <main className="flex-1 px-8 py-6 space-y-6 bg-gray-100">
                    {loading ? (
                        <div className="flex h-screen items-center justify-center bg-gray-100">
                            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Users Card */}
                                <StatCard icon={<FaUser />} label="Users" value={usersData.length} color="blue" />

                                {/* Bookings Card */}
                                <StatCard
                                    icon={<FaCalendarCheck />}
                                    label="Bookings"
                                    value={bookingsData.length}
                                    color="purple"
                                />

                                {/* Devices Card */}
                                <StatCard
                                    icon={<FaCar />}
                                    label="Devices"
                                    value={devicesData.length}
                                    color="indigo"
                                />

                                {/* Alerts Card */}
                                <StatCard
                                    icon={<FaBell />}
                                    label="Alerts"
                                    value={alertsData.length}
                                    color="red"
                                />

                                {/* Vehicles Summary Card */}
                                <StatCard
                                    icon={<FaCar />}
                                    label="Vehicles by Type"
                                    value={vehiclesData.length}
                                    color="green"
                                />

                                {/* API Usage Summary Card */}
                                <StatCard
                                    icon={<FaChartBar />}
                                    label="API Usage"
                                    value={apiUsageData.length}
                                    color="teal"
                                />

                                {/* User Activities Card */}
                                <StatCard
                                    icon={<FaChartBar />}
                                    label="User Activities"
                                    value={userActivitiesData.length}
                                    color="yellow"
                                />
                            </div>
                        </>
                    )}
                </main>

            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, subLabel, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow-md p-5 transition hover:shadow-lg">
        <div className={`text-${color}-600 text-3xl mb-2`}>{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
        {subLabel && <p className="text-sm text-gray-500 mt-1">{subLabel}</p>}
    </div>
);

export default Overview;