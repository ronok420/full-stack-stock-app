import { useState, useMemo } from "react";
import StockRow from "./StockRow";
import Pagination from "./Pagination";

export default function StockTable({ stocks, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Filter stocks by search term
  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) =>
      Object.values(stock)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, stocks]);

  // Get paginated results
  const paginatedStocks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStocks.slice(start, start + itemsPerPage);
  }, [filteredStocks, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredStocks.length / itemsPerPage));

  // Reset to first page if search or itemsPerPage changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleItemsPerPageChange = (n) => {
    setItemsPerPage(n);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <input
        type="text"
        placeholder="🔍 Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full border-2 border-blue-200 rounded-xl px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gradient-to-r from-white to-blue-50 mb-2"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-blue-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700">
            <tr>
              <th className="p-3 font-bold tracking-wide">Date</th>
              <th className="p-3 font-bold tracking-wide">Trade Code</th>
              <th className="p-3 font-bold tracking-wide">Open</th>
              <th className="p-3 font-bold tracking-wide">High</th>
              <th className="p-3 font-bold tracking-wide">Low</th>
              <th className="p-3 font-bold tracking-wide">Close</th>
              <th className="p-3 font-bold tracking-wide">Volume</th>
              <th className="p-3 font-bold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStocks.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400 text-lg font-semibold">
                  No stocks found.
                </td>
              </tr>
            ) : (
              paginatedStocks.map((stock) => (
                <StockRow key={stock.id} stock={stock} onUpdate={onUpdate} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
