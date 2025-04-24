import React, { useEffect, useState } from "react";
import SideBar from "@/components/admin/SideBar";
import TopBar from "@/components/admin/TopBar";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import fetchWithToken from "@/Validation/fetchWithToken";
import { FaUser, FaCar, FaCalendarCheck, FaMoneyBill, FaBell, FaChartBar } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Overview = () => {
    // State for fetched data
    const [usersData, setUsersData] = useState([]);
    const [vehiclesData, setVehiclesData] = useState([]);
    const [bookingsData, setBookingsData] = useState([]);
    const [alertsData, setAlertsData] = useState([]);
    const [apiUsageData, setApiUsageData] = useState([]);
    const [devicesData, setDevicesData] = useState([]);
    const [userActivitiesData, setUserActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend APIs
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

    // Aggregate data for charts
    const vehiclesByType = vehiclesData.reduce((acc, vehicle) => {
        acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
        return acc;
    }, {});

    const vehiclesChartData = Object.entries(vehiclesByType).map(([type, count]) => ({
        type,
        count,
    }));

    const apiUsageByEndpoint = apiUsageData.reduce((acc, entry) => {
        acc[entry.endpoint] = (acc[entry.endpoint] || 0) + 1;
        return acc;
    }, {});

    const apiUsageChartData = Object.entries(apiUsageByEndpoint).map(([endpoint, count]) => ({
        endpoint,
        count,
    }));

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-gray-800">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 overflow-clip text-white">
                <SideBar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100">
                <TopBar />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {/* Users Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaUser size={40} className="text-blue-600 mb-4" />
                        <h2 className="text-lg font-medium text-gray-800 mb-2">Users</h2>
                        <ul className="mt-2 space-y-2 text-center">
                            <li className="text-sm text-gray-600">
                                Total Users: <span className="font-bold">{usersData.length}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Vehicles Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaCar size={40} className="text-green-600 mb-4" />
                        <h2 className="text-lg font-medium text-gray-800 mb-4">Vehicles by Type</h2>
                        <PieChart width={300} height={200}>
                            <Pie
                                data={vehiclesChartData}
                                cx={150}
                                cy={100}
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {vehiclesChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>

                    {/* Bookings Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaCalendarCheck size={40} className="text-purple-600 mb-4" />
                        <h2 className="text-lg font-medium text-gray-800 mb-2">Bookings</h2>
                        <ul className="mt-2 space-y-2 text-center">
                            <li className="text-sm text-gray-600">
                                Total Bookings: <span className="font-bold">{bookingsData.length}</span>
                            </li>
                            <li className="text-sm text-gray-600">
                                Active Bookings:{" "}
                                <span className="font-bold">
                                    {bookingsData.filter((booking) => booking.status === true).length}
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Alerts Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaBell size={40} className="text-red-600 mb-4" />
                        <h2 className="text-lg font-medium text-gray-800 mb-2">Alerts</h2>
                        <ul className="mt-2 space-y-2 text-center">
                            <li className="text-sm text-gray-600">
                                Total Alerts: <span className="font-bold">{alertsData.length}</span>
                            </li>
                            <li className="text-sm text-gray-600">
                                Recent Alerts:
                                <ul className="list-disc ml-4">
                                    {alertsData.slice(0, 5).map((alert, index) => (
                                        <li key={index}>{alert.detected_slot}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* API Usage Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FaChartBar size={40} className="text-teal-600 mb-4" />
                        <h2 className="text-lg font-medium text-gray-800 mb-4">API Usage</h2>
                        <BarChart
                            width={300}
                            height={200}
                            data={apiUsageChartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="endpoint" angle={-45} textAnchor="end" interval={0} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </div>

                    {/* Devices Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaCar size={40} className="text-indigo-600 mb-4" />
                        <h2 className="text-lg font-medium text-gray-800 mb-2">Devices</h2>
                        <ul className="mt-2 space-y-2 text-center">
                            <li className="text-sm text-gray-600">
                                Total Devices: <span className="font-bold">{devicesData.length}</span>
                            </li>
                        </ul>
                    </div>

                    {/* User Activities Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaChartBar size={40} className="text-yellow-600 mb-4" />
                        <h2 className="text-lg font-medium text-gray-800 mb-2">User Activities</h2>
                        <ul className="mt-2 space-y-2 text-center">
                            <li className="text-sm text-gray-600">
                                Total Activities:{" "}
                                <span className="font-bold">{userActivitiesData.length}</span>
                            </li>
                            <li className="text-sm text-gray-600">
                                Recent Activities:
                                <ul className="list-disc ml-4">
                                    {userActivitiesData.slice(0, 5).map((activity, index) => (
                                        <li key={index}>
                                            Entry: {activity.entry_time}, Exit: {activity.exit_time}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Overview;