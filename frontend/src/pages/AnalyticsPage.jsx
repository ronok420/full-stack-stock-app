import { useEffect, useState } from "react";
import { getStocks } from "../services/api";
import StockAnalytics from "../components/StockAnalytics";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AnalyticsPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full max-w-7xl mx-auto p-6 rounded-3xl shadow-2xl bg-white/80 border border-blue-100 backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg tracking-tight">
        📈 Advanced Stock Analytics
      </h2>
      <div className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        <p className="mb-4">
          This advanced analytics view combines multiple technical indicators to help you make informed trading decisions:
        </p>
        <ul className="text-left list-disc list-inside space-y-2">
          <li><span className="font-semibold text-indigo-600">Close Price:</span> The daily closing price of the stock</li>
          <li><span className="font-semibold text-fuchsia-600">Volume:</span> Trading volume showing market activity</li>
          <li><span className="font-semibold text-green-600">SMA (20):</span> 20-day Simple Moving Average - helps identify trends</li>
          <li><span className="font-semibold text-orange-600">RSI (14):</span> 14-day Relative Strength Index - indicates overbought/oversold conditions</li>
        </ul>
      </div>
      {loading ? (
        <LoadingSpinner message="Loading analytics data..." />
      ) : (
        <StockAnalytics stocks={stocks} />
      )}
    </div>
  );
}