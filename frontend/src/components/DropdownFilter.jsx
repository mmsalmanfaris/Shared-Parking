import React from "react";

const DropdownFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
    // Calculate unique options for the dropdown
    const options = React.useMemo(() => {
        const uniqueOptions = new Set();
        preFilteredRows.forEach((row) => {
            uniqueOptions.add(row.values[id]);
        });
        return Array.from(uniqueOptions).sort();
    }, [id, preFilteredRows]);

    return (
        <select
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value || undefined)}
            className="block mt-1 px-2 py-1 text-sm border border-gray-300 rounded"
        >
            <option value="">All</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
export default DropdownFilter;