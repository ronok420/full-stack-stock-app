import { useEffect, useState } from "react";
import AddForm from "../components/AddForm";
import StockTable from "../components/StockTable";
import { getStocks } from "../services/api";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);

  // Fetch data from backend
  const fetchData = async () => {
    const data = await getStocks();
    console.log("Fetched stocks:", data);
    setStocks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50 flex items-center justify-center py-10 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto p-6 rounded-3xl shadow-2xl bg-white/80 border border-blue-100 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg tracking-tight animate-gradient-move">
          📊 Smart Stock CRUD Dashboard
        </h1>
        {/* Top Form for New Stock */}
        <AddForm onAdd={fetchData} />
        {/* Table with Inline Editing, Search, Pagination */}
        <StockTable stocks={stocks} onUpdate={fetchData} />
      </div>
    </div>
  );
}

