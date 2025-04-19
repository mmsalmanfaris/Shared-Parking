import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useTable, usePagination, useGlobalFilter } from "react-table";

const SlotTable = ({ slots, onEdit, onDelete }) => {
    // Define table columns dynamically
    const columns = React.useMemo(
        () => [
            {
                Header: "Device",
                accessor: "device_id", // Accessor refers to the key in the data object
            },
            {
                Header: "Slot Number",
                accessor: "slotNo", // Slot number field
            },
            {
                Header: "Status",
                accessor: "status", // Status field (e.g., active, inactive, maintenance)
                Cell: ({ value }) => (
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${value === "active"
                            ? "bg-green-500 text-white"
                            : value === "inactive"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                    >
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </span>
                ),
            },
            {
                Header: "Created At",
                accessor: "created_at", // Access the `created_at` field
                Cell: ({ value }) => {
                    // Format the date and time
                    const formattedDate = new Date(value).toLocaleString(); // Converts to "MM/DD/YYYY, HH:MM:SS"
                    return <span>{formattedDate}</span>;
                },
            },
            {
                Header: "Action",
                accessor: "id", // Use the ID for actions
                Cell: ({ value }) => (
                    <div className="flex">
                        {/* Edit Button */}
                        <button
                            onClick={() => {
                                const slot = slots.find((d) => d.id === value);
                                onEdit(slot);
                            }}
                            className="font-medium bg-blue-700 text-white p-1 me-2 text-xl rounded-sm"
                        >
                            <CiEdit />
                        </button>
                        {/* Delete Button */}
                        <button
                            onClick={() => onDelete(value)}
                            className="font-medium bg-red-700 text-white p-1 me-2 text-xl rounded-sm"
                        >
                            <MdOutlineDelete />
                        </button>
                    </div>
                ),
            },
        ],
        [slots, onEdit, onDelete]
    );

    // Prepare data for the table
    const data = React.useMemo(() => slots, [slots]);

    // Initialize React Table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Current page data (for pagination)
        prepareRow,
        state: { globalFilter, pageIndex, pageSize }, // Global search and pagination state
        setGlobalFilter, // Function to update global search
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        setPageSize,
        pageCount,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 }, // Initial pagination settings
        },
        useGlobalFilter, // Enable global filtering
        usePagination // Enable pagination
    );

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            {/* Search Bar */}
            <div className="py-4 ps-5 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        value={globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search for slots..."
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Table */}
            <table
                {...getTableProps()}
                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="px-6 py-3"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.length > 0 ? (
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-4 text-center">
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 pb-10">
                <div className="flex space-x-2">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="px-3 py-1 bg-blue-200 rounded disabled:opacity-50"
                        aria-label="Previous page"
                    >
                        Previous
                    </button>
                    <span className="text-gray-500">
                        Page {pageIndex + 1} of {pageCount}
                    </span>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="px-3 py-1 bg-blue-200 rounded disabled:opacity-50"
                        aria-label="Next page"
                    >
                        Next
                    </button>
                </div>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="px-5 py-1 border rounded"
                    aria-label="Rows per page"
                >
                    {[5, 10, 20].map((pageSizeOption) => (
                        <option key={pageSizeOption} value={pageSizeOption}>
                            Show {pageSizeOption}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SlotTable;