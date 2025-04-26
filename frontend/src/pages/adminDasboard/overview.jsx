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

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            </div>
        );
    }

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