import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import fetchWithToken from "@/Validation/fetchWithToken";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register only necessary elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SystemReport = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchSystemUsage = async () => {
            try {
                const response = await fetchWithToken("http://127.0.0.1:8000/api/report/system-usage");
                if (!response.ok) {
                    throw new Error("Failed to fetch system usage");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching system usage:", error.message);
            }
        };

        fetchSystemUsage();
    }, []);

    if (!data)
        return <div className="flex justify-center">
            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>;

    const barData = {
        labels: ["Booked", "Available", "Inactive"],
        datasets: [
            {
                label: "Slot Distribution",
                data: [
                    data.booked_slots,
                    data.active_slots - data.booked_slots,
                    data.inactive_slots,
                ],
                backgroundColor: ["#3b82f6", "#10b981", "#f87171"],
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "#e5e7eb",
                },
            },
        },
    };

    return (
        <div className="p-4 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500 text-sm">Total Slots</p>
                    <p className="text-xl font-bold">{data.total_slots}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500 text-sm">Booked Slots</p>
                    <p className="text-xl font-bold text-blue-600">{data.booked_slots}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500 text-sm">Active Slots</p>
                    <p className="text-xl font-bold text-green-600">{data.active_slots}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500 text-sm">Inactive Slots</p>
                    <p className="text-xl font-bold text-red-600">{data.inactive_slots}</p>
                </div>
            </div>

            {/* Report Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">Slot Usage Overview</h3>
                    <div className="w-full flex justify-center">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">System Breakdown</h3>
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Metric</th>
                                <th className="p-3">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3">Total Users</td>
                                <td className="p-3">{data.total_users}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3">Total Bookings</td>
                                <td className="p-3">{data.total_bookings}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3">Booking Usage %</td>
                                <td className="p-3">{data.booking_usage_percent}%</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3">Devices Online</td>
                                <td className="p-3">{data.devices_online}</td>
                            </tr>
                            <tr>
                                <td className="p-3">Devices Offline</td>
                                <td className="p-3">{data.devices_offline}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SystemReport;
