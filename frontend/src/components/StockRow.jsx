import { useState } from "react";
import { updateStock, deleteStock } from "../services/api";
import Input from "./Input";
import Button from "./Button";

export default function StockRow({ stock, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(stock);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateStock(stock.id, formData);
    setEditMode(false);
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteStock(stock.id);
    onUpdate();
  };

  return (
    <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
      {Object.keys(formData).map((key) =>
        key !== "id" ? (
          <td key={key} className="p-2">
            {editMode ? (
              <Input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="text-xs"
              />
            ) : (
              <span className="font-medium text-gray-700">{formData[key]}</span>
            )}
          </td>
        ) : null
      )}
      <td className="p-2 space-x-2">
        {editMode ? (
          <Button
            onClick={handleSave}
            variant="success"
            className="text-xs px-3 py-1"
          >
            💾 Save
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            variant="warning"
            className="text-xs px-3 py-1"
          >
            ✏️ Edit
          </Button>
        )}
        <Button
          onClick={handleDelete}
          variant="danger"
          className="text-xs px-3 py-1"
        >
          🗑️
        </Button>
      </td>
    </tr>
  );
}
