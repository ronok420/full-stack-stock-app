import { useState } from "react";
import { createStock } from "../services/api";
import Input from "./Input";
import Button from "./Button";

export default function AddForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: "",
    trade_code: "",
    open: "",
    high: "",
    low: "",
    close: "",
    volume: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields to numbers
      const processedData = {
        ...formData,
        open: parseFloat(formData.open) || 0,
        high: parseFloat(formData.high) || 0,
        low: parseFloat(formData.low) || 0,
        close: parseFloat(formData.close) || 0,
      };
      
      const response = await createStock(processedData);
      console.log('Stock created:', response);
      
      setFormData({
        date: "",
        trade_code: "",
        open: "",
        high: "",
        low: "",
        close: "",
        volume: "",
      });
      onAdd(); // trigger data reload
    } catch (error) {
      console.error('Error creating stock:', error);
      alert('Failed to create stock. Please check the console for details.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 bg-white/90 p-4 rounded-xl shadow-xl border border-blue-100 mb-6 animate-fade-in"
    >
      {Object.keys(formData).map((field) => (
        <Input
          key={field}
          type="text"
          name={field}
          placeholder={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          value={formData[field]}
          onChange={handleChange}
          required
        />
      ))}
      <Button
        type="submit"
        className="col-span-2 sm:col-span-1"
        variant="primary"
      >
        ➕ Add
      </Button>
    </form>
  );
}
