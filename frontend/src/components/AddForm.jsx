
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        open: parseFloat(formData.open) || 0,
        high: parseFloat(formData.high) || 0,
        low: parseFloat(formData.low) || 0,
        close: parseFloat(formData.close) || 0,
      };
      await onAdd(payload);        // ONLY call addStock from context
      setFormData({
        date: "",
        trade_code: "",
        open: "",
        high: "",
        low: "",
        close: "",
        volume: "",
      });
    } catch (err) {
      console.error("Add failed:", err);
      alert("Failed to add—check console.");
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
      ))}
      <Button type="submit" variant="primary" className="col-span-2 sm:col-span-1" disabled={loading}>
        {loading ? "⏳ Adding…" : "➕ Add"}
      </Button>
    </form>
  );
}
