import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 15,
  onItemsPerPageChange,
}) {
  const [inputPage, setInputPage] = useState("");

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const page = Number(inputPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-4 px-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-100">
      {/* Page numbers */}
      <div className="flex items-center gap-1 flex-wrap">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="secondary"
          className="text-blue-700 font-semibold shadow px-3 py-1"
        >
          ◀ Prev
        </Button>
        {getPageNumbers().map((num, idx) =>
          num === "..." ? (
            <span key={idx} className="px-2 text-gray-400">...</span>
          ) : (
            <Button
              key={num}
              onClick={() => onPageChange(num)}
              variant={num === currentPage ? "primary" : "secondary"}
              className={`font-semibold shadow px-3 py-1 ${num === currentPage ? "scale-105" : ""}`}
            >
              {num}
            </Button>
          )
        )}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="secondary"
          className="text-blue-700 font-semibold shadow px-3 py-1"
        >
          Next ▶
        </Button>
      </div>
      {/* Direct page input */}
      <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">Go to</span>
        <Input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          className="w-14 text-center text-sm"
          placeholder="#"
        />
        <Button
          type="submit"
          variant="primary"
          className="text-sm font-semibold shadow px-3 py-1"
        >
          Go
        </Button>
      </form>
      {/* Items per page selector */}
      {onItemsPerPageChange && (
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-300"
          >
            {[10, 15, 20, 30, 50, 100].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
} 