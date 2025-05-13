import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getStocks,
  createStock as apiCreateStock,
  updateStock as apiUpdateStock,
  deleteStock as apiDeleteStock,
} from "../services/api";

const StocksContext = createContext();

export function StocksProvider({ children }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch once on mount
  const fetchStocks = async () => {
    setLoading(true);
    try {
      const data = await getStocks();
      setStocks(data);
    } catch (e) {
      console.error("Failed to load stocks:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Create/Update/Delete helpers that also update local state
  const addStock = async (stockData) => {
    const newStock = await apiCreateStock(stockData);
    setStocks((prev) => [...prev, newStock]);
    return newStock;
  };

  const editStock = async (id, updates) => {
    const updated = await apiUpdateStock(id, updates);
    setStocks((prev) =>
      prev.map((s) => (s.id === id ? updated : s))
    );
    return updated;
  };

  const removeStock = async (id) => {
    await apiDeleteStock(id);
    setStocks((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StocksContext.Provider
      value={{
        stocks,
        loading,
        fetchStocks,
        addStock,
        editStock,
        removeStock,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
}

export function useStocks() {
  return useContext(StocksContext);
}
