import React, { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

function formatNumber(num) {
  return num?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--';
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const close = payload.find((p) => p.dataKey === "close");
  const volume = payload.find((p) => p.dataKey === "volume");
  return (
    <div className="rounded-xl shadow-lg bg-white/90 border border-blue-200 px-4 py-3">
      <div className="font-semibold text-blue-700 mb-1">{formatDate(label)}</div>
      {close && (
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-indigo-500"></span>
          <span className="text-gray-700">Close:</span>
          <span className="font-bold text-indigo-600">{formatNumber(close.value)}</span>
        </div>
      )}
      {volume && (
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-fuchsia-400"></span>
          <span className="text-gray-700">Volume:</span>
          <span className="font-bold text-fuchsia-600">{formatNumber(volume.value)}</span>
        </div>
      )}
    </div>
  );
};

export default function StockChart({ stocks }) {
  // Get unique trade codes
  const tradeCodes = useMemo(
    () => Array.from(new Set(stocks.map((s) => s.trade_code))).sort(),
    [stocks]
  );
  const [selectedCode, setSelectedCode] = useState("");

  // Set default trade code when tradeCodes are loaded
  useEffect(() => {
    if (tradeCodes.length > 0 && !selectedCode) {
      setSelectedCode(tradeCodes[0]);
    }
  }, [tradeCodes, selectedCode]);

  // Filter and sort data for the selected trade code
  const chartData = useMemo(() => {
    return stocks
      .filter((s) => s.trade_code === selectedCode)
      .map((s) => ({
        ...s,
        date: s.date,
        close: parseFloat(s.close),
        volume: parseFloat(s.volume),
      }))
      .filter((s) => !isNaN(s.close) && !isNaN(s.volume))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [stocks, selectedCode]);

  return (
    <div className="w-full bg-white/80 rounded-xl shadow p-6 border border-blue-100 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-700">Trade Code:</span>
          <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-300 bg-white"
          >
            {tradeCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <span className="text-gray-500 text-sm">Line: Close Price | Bar: Volume</span>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" height={60} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} width={60} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} width={60} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="right" dataKey="volume" fill="#a78bfa" name="Volume" barSize={18} radius={[4, 4, 0, 0]} />
            <Line yAxisId="left" type="monotone" dataKey="close" stroke="#6366f1" strokeWidth={3} dot={false} name="Close Price" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {chartData.length === 0 && (
        <div className="text-center text-gray-400 py-12 text-lg">No data for this trade code.</div>
      )}
    </div>
  );
}
