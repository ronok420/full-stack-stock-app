import { useState } from "react";
import { updateStock, deleteStock } from "../services/api";
import Input from "./Input";
import Button from "./Button";

export default function StockRow({ stock, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(stock);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Optimistically update the UI
      onUpdate(formData);
      setEditMode(false);
      
      // Then update the backend
      const updatedStock = await updateStock(stock.id, formData);
      // Update with the server response in case there were any server-side changes
      onUpdate(updatedStock);
    } catch (error) {
      console.error('Error saving stock:', error);
      // Revert the optimistic update on error
      onUpdate(stock);
      setFormData(stock);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Optimistically remove from UI
      onDelete(stock.id);
      
      // Then delete from backend
      await deleteStock(stock.id);
    } catch (error) {
      console.error('Error deleting stock:', error);
      // Revert the optimistic update on error
      onUpdate(stock);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid grid-cols-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
      {Object.keys(formData).map((key) =>
        key !== "id" ? (
          <div key={key} className="p-2">
            {editMode ? (
              <Input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="text-xs"
                disabled={isSaving}
              />
            ) : (
              <span className="font-medium text-gray-700">{formData[key]}</span>
            )}
          </div>
        ) : null
      )}
      <div className="p-2 space-x-2">
        {editMode ? (
          <Button
            onClick={handleSave}
            variant="success"
            className="text-xs px-3 py-1"
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "💾 Save"
            )}
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            variant="warning"
            className="text-xs px-3 py-1"
            disabled={isDeleting}
          >
            ✏️ Edit
          </Button>
        )}
        <Button
          onClick={handleDelete}
          variant="danger"
          className="text-xs px-3 py-1"
          disabled={isDeleting || editMode}
        >
          {isDeleting ? (
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "🗑️"
          )}
        </Button>
      </div>
    </div>
  );
}
