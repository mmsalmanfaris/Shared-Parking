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

const UserReport = () => {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        nic: "",
        isActive: "",
    });

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetchWithToken("http://127.0.0.1:8000/api/report/users");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };
        fetchUsers();
    }, []);

    // Filtered data
    const filteredData = useMemo(() =>
        users.filter(
            (user) =>
                (!filters.name || user.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
                (!filters.nic || user.nic?.includes(filters.nic)) &&
                (filters.isActive === "" || String(user.is_active) === filters.isActive)
        ),
        [users, filters]
    );

    // Columns for React Table
    const columns = useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "NIC", accessor: "nic" },
            { Header: "Address", accessor: "address" },
            { Header: "Contact", accessor: "contact" },
            {
                Header: "Created At",
                accessor: "created_at",
                Cell: ({ value }) => formatDate(value),
            },
            {
                Header: "Last Login",
                accessor: "last_login",
                Cell: ({ value }) => formatDate(value),
            },
            {
                Header: "Active",
                accessor: "is_active",
                Cell: ({ value }) => (value ? "No" : "Yes"),
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
        useSortBy,
        usePagination
    );

    // CSV headers
    const csvHeaders = [
        { label: "Name", key: "name" },
        { label: "NIC", key: "nic" },
        { label: "Address", key: "address" },
        { label: "Contact", key: "contact" },
        { label: "Created At", key: "created_at" },
        { label: "Last Login", key: "last_login" },
        { label: "Active", key: "is_active" },
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
            doc.text("User Report", 14, 20);

            // Define table columns and rows
            const tableColumns = ["Name", "NIC", "Address", "Contact", "Created At", "Last Login", "Active"];
            const tableRows = filteredData.map((user) => [
                user.name || "",
                user.nic || "",
                user.address || "",
                user.contact || "",
                formatDate(user.created_at) || "",
                formatDate(user.last_login) || "",
                user.is_active ? "Yes" : "No",
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

            doc.save("user-report.pdf");
        } catch (error) {
            console.error("PDF export failed:", error.message);
            alert("Failed to export PDF: " + error.message);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            {!users ? (
                <div className="flex justify-center">
                    <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            ) : (
                < div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">System User Report</h2>
                    <div className="bg-white rounded-lg border p-6">
                        {/* Filters and Buttons */}
                        <div className="flex flex-wrap gap-4 items-center mb-6">
                            <input
                                type="text"
                                placeholder="Filter by Name"
                                value={filters.name}
                                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                            />
                            <input
                                type="text"
                                placeholder="Filter by NIC"
                                value={filters.nic}
                                onChange={(e) => setFilters({ ...filters, nic: e.target.value })}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                            />
                            <select
                                value={filters.isActive}
                                onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
                            >
                                <option value="">All</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            <button
                                onClick={() => setFilters({ name: "", nic: "", isActive: "" })}
                                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
                            >
                                Reset Filters
                            </button>
                            <CSVLink
                                data={filteredData}
                                headers={csvHeaders}
                                filename="user-report.csv"
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
            )}

        </div >
    );
};

export default UserReport;