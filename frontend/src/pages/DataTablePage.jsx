
import StockTable from "../components/StockTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useStocks } from "../context/StocksContext";

export default function DataTablePage() {
  const { stocks, loading, fetchStocks } = useStocks();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 rounded-3xl shadow-2xl bg-white/80 border border-blue-100 backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg tracking-tight">
        📋 Stock Data Table
      </h2>

      {loading ? (
        <LoadingSpinner message="Loading table data..." />
      ) : (
        <StockTable stocks={stocks} onUpdate={fetchStocks} />
      )}
    </div>
  );
}
