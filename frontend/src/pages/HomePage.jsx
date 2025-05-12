import { useEffect, useState, Suspense, lazy, useMemo } from "react";
import AddForm from "../components/AddForm";
import { getStocks } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDebounce } from "use-debounce";

// Lazy load StockChart
const StockChart = lazy(() => import("../components/StockChart"));

function formatNumber(num) {
  return num?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--';
}

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    const data = await getStocks();
    setStocks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Memoize filtered stocks
  const filteredStocks = useMemo(() => 
    stocks.filter(stock => 
      stock.symbol?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      stock.date?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ),
    [stocks, debouncedSearchTerm]
  );

  // Memoize sorted stocks and calculations
  const { sortedStocks, closes, volumes } = useMemo(() => {
    const sorted = [...filteredStocks].sort((a, b) => new Date(a.date) - new Date(b.date));
    const closeValues = sorted.map(s => parseFloat(s.close)).filter(Number.isFinite);
    const volumeValues = sorted.map(s => parseFloat(s.volume)).filter(Number.isFinite);
    return { sortedStocks: sorted, closes: closeValues, volumes: volumeValues };
  }, [filteredStocks]);

  // Memoize market summary calculations
  const marketSummary = useMemo(() => {
    const avgClose = closes.length ? closes.reduce((a, b) => a + b, 0) / closes.length : 0;
    const totalVolume = volumes.length ? volumes.reduce((a, b) => a + b, 0) : 0;
    return { avgClose, totalVolume };
  }, [closes, volumes]);

  // Memoize price range calculations
  const priceRange = useMemo(() => ({
    highestClose: closes.length ? Math.max(...closes) : 0,
    lowestClose: closes.length ? Math.min(...closes) : 0
  }), [closes]);

  // Memoize recent changes calculations
  const recentChanges = useMemo(() => {
    const lastClose = closes.length > 0 ? closes[closes.length - 1] : 0;
    const prevClose = closes.length > 1 ? closes[closes.length - 2] : 0;
    const priceChange = prevClose ? ((lastClose - prevClose) / prevClose) * 100 : 0;

    const lastVolume = volumes.length > 0 ? volumes[volumes.length - 1] : 0;
    const prevVolume = volumes.length > 1 ? volumes[volumes.length - 2] : 0;
    const volumeChange = prevVolume ? ((lastVolume - prevVolume) / prevVolume) * 100 : 0;

    return { priceChange, volumeChange };
  }, [closes, volumes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50 flex items-center justify-center py-10 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto p-6 rounded-3xl shadow-2xl bg-white/80 border border-blue-100 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg tracking-tight animate-gradient-move">
          📊 Smart Stock CRUD Dashboard
        </h1>
        {/* Top Form for New Stock */}
        <AddForm onAdd={fetchData} />
        
        {/* Search Input */}
        <div className="my-4">
          <input
            type="text"
            placeholder="Search stocks..."
            className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <LoadingSpinner message="Loading dashboard data..." />
        ) : (
          <>
            {/* Chart Visualization */}
            <Suspense fallback={<LoadingSpinner message="Loading chart..." />}>
              <StockChart stocks={filteredStocks} />
            </Suspense>
            
            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {/* Market Summary */}
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-xl shadow p-6 min-h-[120px] flex flex-col justify-center items-start">
                <span className="text-lg font-semibold text-blue-700 mb-2">Market Summary</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-blue-800">Avg Close</span>
                  <span className="text-2xl font-bold text-blue-900">{formatNumber(marketSummary.avgClose)}</span>
                  <span className="text-sm text-blue-800 mt-2">Total Volume</span>
                  <span className="text-xl font-bold text-blue-900">{formatNumber(marketSummary.totalVolume)}</span>
                </div>
              </div>
              {/* Price Range */}
              <div className="bg-gradient-to-br from-purple-200 to-purple-100 rounded-xl shadow p-6 min-h-[120px] flex flex-col justify-center items-start">
                <span className="text-lg font-semibold text-purple-700 mb-2">Price Range</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-purple-800">Highest</span>
                  <span className="text-2xl font-bold text-purple-900">{formatNumber(priceRange.highestClose)}</span>
                  <span className="text-sm text-purple-800 mt-2">Lowest</span>
                  <span className="text-xl font-bold text-purple-900">{formatNumber(priceRange.lowestClose)}</span>
                </div>
              </div>
              {/* Recent Changes */}
              <div className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-xl shadow p-6 min-h-[120px] flex flex-col justify-center items-start">
                <span className="text-lg font-semibold text-pink-700 mb-2">Recent Changes</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-pink-800">Price Change</span>
                  <span className={`text-2xl font-bold ${recentChanges.priceChange > 0 ? "text-green-600" : recentChanges.priceChange < 0 ? "text-red-600" : "text-gray-700"}`}>
                    {recentChanges.priceChange > 0 ? "+" : ""}{formatNumber(recentChanges.priceChange)}%
                  </span>
                  <span className="text-sm text-pink-800 mt-2">Volume Change</span>
                  <span className={`text-xl font-bold ${recentChanges.volumeChange > 0 ? "text-green-600" : recentChanges.volumeChange < 0 ? "text-red-600" : "text-gray-700"}`}>
                    {recentChanges.volumeChange > 0 ? "+" : ""}{formatNumber(recentChanges.volumeChange)}%
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

