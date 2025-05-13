import { useState, useMemo, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import StockRow from "./StockRow";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";

const ROW_HEIGHT = 60; // Height of each row in pixels

export default function StockTable({ stocks: initialStocks, onUpdate }) {
  const [stocks, setStocks] = useState(initialStocks);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [isSearching, setIsSearching] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);

  // Update local state when initialStocks changes
  useEffect(() => {
    setStocks(initialStocks);
  }, [initialStocks]);

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

  // Handle local state updates
  const handleStockUpdate = (updatedStock) => {
    setStocks(prevStocks => 
      prevStocks.map(stock => 
        stock.id === updatedStock.id ? updatedStock : stock
      )
    );
  };

  const handleStockDelete = (deletedId) => {
    setStocks(prevStocks => 
      prevStocks.filter(stock => stock.id !== deletedId)
    );
  };

  const handleStockAdd = (newStock) => {
    setStocks(prevStocks => [...prevStocks, newStock]);
  };

  // Reset to first page if search or itemsPerPage changes
  const handleSearchChange = (e) => {
    setIsSearching(true);
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    // Simulate a small delay for better UX
    setTimeout(() => setIsSearching(false), 300);
  };

  const handleItemsPerPageChange = (n) => {
    setIsPageChanging(true);
    setItemsPerPage(n);
    setCurrentPage(1);
    // Simulate a small delay for better UX
    setTimeout(() => setIsPageChanging(false), 300);
  };

  const handlePageChange = (page) => {
    setIsPageChanging(true);
    setCurrentPage(page);
    // Simulate a small delay for better UX
    setTimeout(() => setIsPageChanging(false), 300);
  };

  // Row renderer for virtualized list
  const Row = ({ index, style }) => {
    const stock = paginatedStocks[index];
    return (
      <div style={style}>
        <StockRow 
          stock={stock} 
          onUpdate={handleStockUpdate}
          onDelete={handleStockDelete}
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search bar with loading state */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border-2 border-blue-200 rounded-xl px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gradient-to-r from-white to-blue-50 mb-2"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

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
                  {isSearching ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    "No stocks found."
                  )}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={8} className="p-0">
                  {isPageChanging ? (
                    <div className="flex items-center justify-center h-[300px]">
                      <LoadingSpinner message="Loading page..." />
                    </div>
                  ) : (
                    <List
                      height={Math.min(paginatedStocks.length * ROW_HEIGHT, 600)}
                      itemCount={paginatedStocks.length}
                      itemSize={ROW_HEIGHT}
                      width="100%"
                    >
                      {Row}
                    </List>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        isLoading={isPageChanging}
      />
    </div>
  );
}
