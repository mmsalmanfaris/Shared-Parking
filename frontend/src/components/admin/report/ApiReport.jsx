import React, { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useTable, usePagination } from "react-table";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fetchWithToken from "@/Validation/fetchWithToken";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ApiReport = () => {
    const [apiUsageData, setApiUsageData] = useState([]);
    const [filters, setFilters] = useState({
        endpoint: "",
        method: "",
        status_code: "",
    });

    // Fetch API usage data
    useEffect(() => {
        const fetchApiUsage = async () => {
            try {
                const res = await fetchWithToken("http://127.0.0.1:8000/api/report/api-usage");
                const data = await res.json();
                console.log("API Usage Data:", data);
                setApiUsageData(data);
            } catch (err) {
                console.error("Failed to fetch API usage data:", err);
            }
        };
        fetchApiUsage();
    }, []);

    // Filtered data for table
    const filteredData = useMemo(
        () =>
            apiUsageData.filter(
                (entry) =>
                    (!filters.endpoint || entry.endpoint?.toLowerCase().includes(filters.endpoint.toLowerCase())) &&
                    (!filters.method || entry.method?.toLowerCase() === filters.method.toLowerCase()) &&
                    (!filters.status_code || String(entry.status_code) === filters.status_code)
            ),
        [apiUsageData, filters]
    );

    // Aggregate data for bar chart (requests per endpoint)
    const requestsPerEndpoint = useMemo(() => {
        return filteredData.reduce((acc, entry) => {
            const endpoint = entry.endpoint || "unknown";
            acc[endpoint] = (acc[endpoint] || 0) + 1;
            return acc;
        }, {});
    }, [filteredData]);

    const chartData = useMemo(() => {
        return Object.entries(requestsPerEndpoint).map(([endpoint, count]) => ({
            endpoint,
            count,
        }));
    }, [requestsPerEndpoint]);

    // Columns for React Table
    const columns = useMemo(
        () => [
            { Header: "Endpoint", accessor: "endpoint" },
            { Header: "Method", accessor: "method" },
            { Header: "Status Code", accessor: "status_code" },
            {
                Header: "Duration (s)",
                accessor: "duration_seconds",
                Cell: ({ value }) => value.toFixed(2),
            },
            {
                Header: "Timestamp",
                accessor: "timestamp",
                Cell: ({ value }) => new Date(value).toLocaleString(),
            },
        ],
        []
    );

    // React Table setup
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        usePagination
    );

    // CSV headers
    const csvHeaders = [
        { label: "Endpoint", key: "endpoint" },
        { label: "Method", key: "method" },
        { label: "Status Code", key: "status_code" },
        { label: "Duration (s)", key: "duration_seconds" },
        { label: "Timestamp", key: "timestamp" },
    ];

    // PDF export function
    const exportToPDF = () => {
        try {
            if (!filteredData.length) {
                alert("No data to export. Please ensure there is data in the table.");
                return;
            }

            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text("API Usage Report", 14, 20);

            // Define table columns and rows
            const tableColumns = ["Endpoint", "Method", "Status Code", "Duration (s)", "Timestamp"];
            const tableRows = filteredData.map((entry) => [
                entry.endpoint || "",
                entry.method || "",
                entry.status_code || "",
                entry.duration_seconds.toFixed(2) || "",
                new Date(entry.timestamp).toLocaleString() || "",
            ]);

            // Generate table with autoTable
            autoTable(doc, {
                head: [tableColumns],
                body: tableRows,
                startY: 30,
                theme: "striped",
                headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
                styles: { fontSize: 10, cellPadding: 3 },
            });

            doc.save("api-usage-report.pdf");
        } catch (error) {
            console.error("PDF export failed:", error.message);
            alert("Failed to export PDF: " + error.message);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">API Usage Report</h2>
                <div className="bg-white rounded-lg border p-6">
                    {/* Filters and Buttons */}
                    <div className="flex flex-wrap gap-4 items-center mb-6">
                        <input
                            type="text"
                            placeholder="Filter by Endpoint"
                            value={filters.endpoint}
                            onChange={(e) => setFilters({ ...filters, endpoint: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                        />
                        <select
                            value={filters.method}
                            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
                        >
                            <option value="">All</option>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Filter by Status Code"
                            value={filters.status_code}
                            onChange={(e) => setFilters({ ...filters, status_code: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
                        />
                        <button
                            onClick={() => setFilters({ endpoint: "", method: "", status_code: "" })}
                            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
                        >
                            Reset Filters
                        </button>
                        <CSVLink
                            data={filteredData}
                            headers={csvHeaders}
                            filename="api-usage-report.csv"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Export to CSV
                        </CSVLink>
                        <button
                            onClick={exportToPDF}
                            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                        >
                            Export to PDF
                        </button>
                    </div>

                    {/* Bar Chart */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Requests Per Endpoint</h3>
                        <BarChart
                            width={1250}
                            height={400}
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                bottom: 15,
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

                    {/* React Table */}
                    <div className="overflow-x-auto">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps()}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end gap-3 items-center mt-4">
                        <button
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                            {"<<"}
                        </button>
                        <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {pageIndex + 1} of {pageOptions.length}
                        </span>
                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                            {">>"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiReport;