import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import fetchWithToken from "@/Validation/fetchWithToken";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Custom date formatter
const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
};

const BookingReport = () => {
    const [bookings, setBookings] = useState([]);

    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetchWithToken("http://127.0.0.1:8000/api/report/bookings");
                const data = await res.json();
                console.log("API data:", data); // Log API response
                setBookings(data);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            }
        };
        fetchBookings();
    }, []);

    // Aggregate data for pie chart (payment status)
    const paymentStatusData = Object.entries(
        bookings.reduce((acc, booking) => {
            const status = booking.payment_status || "unknown";
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    // Aggregate data for bar chart (bookings per day)
    const bookingsPerDay = Object.entries(
        bookings.reduce((acc, booking) => {
            const date = booking.from_date || "unknown";
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {})
    ).map(([from_date, count]) => ({ from_date, count }));

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Report</h2>
                <div className="bg-white rounded-lg border p-6">
                    {/* Table */}
                    <div className="overflow-x-auto mb-8">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        From Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        To Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking.booking_code}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.booking_code}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.from_date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.to_date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.payment_status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(booking.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pie Chart */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Status Distribution</h3>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={paymentStatusData}
                                cx={200}
                                cy={150}
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {paymentStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>

                    {/* Bar Chart */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Bookings Per Day</h3>
                        <BarChart
                            width={600}
                            height={300}
                            data={bookingsPerDay}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="from_date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingReport;