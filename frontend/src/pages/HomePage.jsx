import { useMemo, useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import LoadingSpinner from "../components/LoadingSpinner";
import AddForm from "../components/AddForm";
import { useStocks } from "../context/StocksContext";

function formatNumber(num) {
  return num?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? "--";
}

export default function HomePage() {
  // Pull only the helpers needed for
  const { stocks, loading, addStock } = useStocks();

  //  Summary Card Calculations (memoized) 
  const {
    sortedStocks,
    avgClose,
    totalVolume,
    highestClose,
    lowestClose,
    priceChange,
    volumeChange,
  } = useMemo(() => {
    // sort by date
    const sorted = [...stocks].sort((a, b) => new Date(a.date) - new Date(b.date));
    const closes = sorted.map((s) => parseFloat(s.close)).filter(Number.isFinite);
    const volumes = sorted.map((s) => parseFloat(s.volume)).filter(Number.isFinite);

    const avg = closes.length ? closes.reduce((a, b) => a + b, 0) / closes.length : 0;
    const totalVol = volumes.length ? volumes.reduce((a, b) => a + b, 0) : 0;
    const high = closes.length ? Math.max(...closes) : 0;
    const low = closes.length ? Math.min(...closes) : 0;

    const last = closes.length > 0 ? closes.at(-1) : 0;
    const prev = closes.length > 1 ? closes.at(-2) : last;
    const pctPrice = prev ? ((last - prev) / prev) * 100 : 0;

    const lastVol = volumes.length > 0 ? volumes.at(-1) : 0;
    const prevVol = volumes.length > 1 ? volumes.at(-2) : lastVol;
    const pctVol = prevVol ? ((lastVol - prevVol) / prevVol) * 100 : 0;

    return {
      sortedStocks: sorted,
      avgClose: avg,
      totalVolume: totalVol,
      highestClose: high,
      lowestClose: low,
      priceChange: pctPrice,
      volumeChange: pctVol,
    };
  }, [stocks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50 flex items-center justify-center py-10 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto p-6 rounded-3xl shadow-2xl bg-white/80 border border-blue-100 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg tracking-tight animate-gradient-move">
          📊 Smart Stock CRUD Dashboard
        </h1>

        {/*  Top Form — only calls addStock, no refetch */}
        <AddForm onAdd={addStock} />

        {loading ? (
          <LoadingSpinner message="Loading dashboard data..." />
        ) : (
          <>
            {/* Chart Visualization */}
            <StockChart stocks={stocks} />

            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {/* Market Summary */}
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-xl shadow p-6 min-h-[120px] flex flex-col justify-center items-start">
                <span className="text-lg font-semibold text-blue-700 mb-2">Market Summary</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-blue-800">Avg Close</span>
                  <span className="text-2xl font-bold text-blue-900">{formatNumber(avgClose)}</span>
                  <span className="text-sm text-blue-800 mt-2">Total Volume</span>
                  <span className="text-xl font-bold text-blue-900">{formatNumber(totalVolume)}</span>
                </div>
              </div>
              {/* Price Range */}
              <div className="bg-gradient-to-br from-purple-200 to-purple-100 rounded-xl shadow p-6 min-h-[120px] flex flex-col justify-center items-start">
                <span className="text-lg font-semibold text-purple-700 mb-2">Price Range</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-purple-800">Highest</span>
                  <span className="text-2xl font-bold text-purple-900">{formatNumber(highestClose)}</span>
                  <span className="text-sm text-purple-800 mt-2">Lowest</span>
                  <span className="text-xl font-bold text-purple-900">{formatNumber(lowestClose)}</span>
                </div>
              </div>
              {/* Recent Changes */}
              <div className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-xl shadow p-6 min-h-[120px] flex flex-col justify-center items-start">
                <span className="text-lg font-semibold text-pink-700 mb-2">Recent Changes</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-pink-800">Price Change</span>
                  <span
                    className={`text-2xl font-bold ${
                      priceChange > 0 ? "text-green-600" : priceChange < 0 ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {priceChange > 0 ? "+" : ""}
                    {formatNumber(priceChange)}%
                  </span>
                  <span className="text-sm text-pink-800 mt-2">Volume Change</span>
                  <span
                    className={`text-xl font-bold ${
                      volumeChange > 0 ? "text-green-600" : volumeChange < 0 ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {volumeChange > 0 ? "+" : ""}
                    {formatNumber(volumeChange)}%
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
