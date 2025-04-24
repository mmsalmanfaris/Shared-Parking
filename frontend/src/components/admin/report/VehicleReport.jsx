import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fetchWithToken from "@/Validation/fetchWithToken";

// Custom date formatter
const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0];
};

const VehicleReport = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filters, setFilters] = useState({
        brand: "",
        plateNumber: "",
    });

    // Fetch vehicles
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetchWithToken("http://127.0.0.1:8000/api/report/vehicles");
                const data = await res.json();
                console.log("API data:", data); // Log API response
                setVehicles(data);
            } catch (err) {
                console.error("Failed to fetch vehicles:", err);
            }
        };
        fetchVehicles();
    }, []);

    // Filtered data
    const filteredData = useMemo(
        () =>
            vehicles.filter(
                (vehicle) =>
                    (!filters.brand || vehicle.brand?.toLowerCase().includes(filters.brand.toLowerCase())) &&
                    (!filters.plateNumber || vehicle.plate_number?.includes(filters.plateNumber))
            ),
        [vehicles, filters]
    );

    // Columns for React Table
    const columns = useMemo(
        () => [
            { Header: "Brand", accessor: "brand" },
            { Header: "Model", accessor: "model" },
            { Header: "Color", accessor: "color" },
            { Header: "Plate Number", accessor: "plate_number" },
            {
                Header: "Created At",
                accessor: "created_at",
                Cell: ({ value }) => formatDate(value),
            },
            { Header: "User Name", accessor: "user_name" },
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
        useSortBy,
        usePagination
    );

    // CSV headers
    const csvHeaders = [
        { label: "Brand", key: "brand" },
        { label: "Model", key: "model" },
        { label: "Color", key: "color" },
        { label: "Plate Number", key: "plate_number" },
        { label: "Created At", key: "created_at" },
        { label: "User Name", key: "user_name" },
    ];

    // Export to PDF
    const exportToPDF = () => {
        try {
            if (!filteredData.length) {
                alert("No data to export. Please ensure there is data in the table.");
                return;
            }

            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text("Vehicle Report", 14, 20);

            // Define table columns and rows
            const tableColumns = ["Brand", "Model", "Color", "Plate Number", "Created At", "User Name"];
            const tableRows = filteredData.map((vehicle) => [
                vehicle.brand || "",
                vehicle.model || "",
                vehicle.color || "",
                vehicle.plate_number || "",
                formatDate(vehicle.created_at) || "",
                vehicle.user_name || "",
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

            doc.save("vehicle-report.pdf");
        } catch (error) {
            console.error("PDF export failed:", error.message);
            alert("Failed to export PDF: " + error.message);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">System Vehicle Report</h2>
                <div className="bg-white rounded-lg border p-6">
                    {/* Filters and Buttons */}
                    <div className="flex flex-wrap gap-4 items-center mb-6">
                        <input
                            type="text"
                            placeholder="Filter by Brand"
                            value={filters.brand}
                            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                        />
                        <input
                            type="text"
                            placeholder="Filter by Plate Number"
                            value={filters.plateNumber}
                            onChange={(e) => setFilters({ ...filters, plateNumber: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                        />
                        <button
                            onClick={() => setFilters({ brand: "", plateNumber: "" })}
                            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
                        >
                            Reset Filters
                        </button>
                        <CSVLink
                            data={filteredData}
                            headers={csvHeaders}
                            filename="vehicle-report.csv"
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

                    {/* React Table */}
                    <div className="overflow-x-auto">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {column.render("Header")}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? " 🔽"
                                                            : " 🔼"
                                                        : ""}
                                                </span>
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

export default VehicleReport;