import React, { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  Line,
} from "recharts";

function formatNumber(num) {
  return num?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--';
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
}

// Calculate Simple Moving Average (SMA)
function calculateSMA(data, period) {
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null);
      continue;
    }
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0);
    sma.push(sum / period);
  }
  return sma;
}

// Calculate Relative Strength Index (RSI)
function calculateRSI(data, period) {
  const rsi = [];
  let gains = 0;
  let losses = 0;

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      rsi.push(null);
      continue;
    }

    const change = data[i].close - data[i - 1].close;
    if (change >= 0) {
      gains += change;
    } else {
      losses -= change;
    }

    if (i < period) {
      rsi.push(null);
      continue;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgGain / avgLoss;
    const rsiValue = 100 - (100 / (1 + rs));
    rsi.push(rsiValue);

    // Remove oldest change
    const oldestChange = data[i - period + 1].close - data[i - period].close;
    if (oldestChange >= 0) {
      gains -= oldestChange;
    } else {
      losses += oldestChange;
    }
  }
  return rsi;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const close = payload.find((p) => p.dataKey === "close");
  const volume = payload.find((p) => p.dataKey === "volume");
  const sma = payload.find((p) => p.dataKey === "sma");
  const rsi = payload.find((p) => p.dataKey === "rsi");

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
      {sma && (
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-gray-700">SMA:</span>
          <span className="font-bold text-green-600">{formatNumber(sma.value)}</span>
        </div>
      )}
      {rsi && (
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
          <span className="text-gray-700">RSI:</span>
          <span className="font-bold text-orange-600">{formatNumber(rsi.value)}</span>
        </div>
      )}
    </div>
  );
};

export default function StockAnalytics({ stocks }) {
  const [selectedCode, setSelectedCode] = useState("");
  const tradeCodes = useMemo(
    () => Array.from(new Set(stocks.map((s) => s.trade_code))).sort(),
    [stocks]
  );

  useEffect(() => {
    if (tradeCodes.length > 0 && !selectedCode) {
      setSelectedCode(tradeCodes[0]);
    }
  }, [tradeCodes, selectedCode]);

  const chartData = useMemo(() => {
    const filteredData = stocks
      .filter((s) => s.trade_code === selectedCode)
      .map((s) => ({
        ...s,
        date: s.date,
        close: parseFloat(s.close),
        volume: parseFloat(s.volume),
      }))
      .filter((s) => !isNaN(s.close) && !isNaN(s.volume))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate technical indicators
    const sma = calculateSMA(filteredData, 20); // 20-day SMA
    const rsi = calculateRSI(filteredData, 14); // 14-day RSI

    return filteredData.map((data, index) => ({
      ...data,
      sma: sma[index],
      rsi: rsi[index],
    }));
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
        <div className="text-gray-500 text-sm">
          <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-1"></span>
          Close Price
          <span className="inline-block w-3 h-3 rounded-full bg-fuchsia-400 ml-4 mr-1"></span>
          Volume
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 ml-4 mr-1"></span>
          SMA (20)
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500 ml-4 mr-1"></span>
          RSI (14)
        </div>
      </div>
      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" height={60} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} width={60} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} width={60} />
            <YAxis yAxisId="rsi" orientation="right" tick={{ fontSize: 12 }} width={60} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="right" dataKey="volume" fill="#a78bfa" name="Volume" barSize={18} radius={[4, 4, 0, 0]} />
            <Line yAxisId="left" type="monotone" dataKey="close" stroke="#6366f1" strokeWidth={3} dot={false} name="Close Price" />
            <Line yAxisId="left" type="monotone" dataKey="sma" stroke="#22c55e" strokeWidth={2} dot={false} name="SMA (20)" />
            <Line yAxisId="rsi" type="monotone" dataKey="rsi" stroke="#f97316" strokeWidth={2} dot={false} name="RSI (14)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {chartData.length === 0 && (
        <div className="text-center text-gray-400 py-12 text-lg">No data for this trade code.</div>
      )}
    </div>
  );
} 