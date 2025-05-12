import React from "react";

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  error = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-2 border-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gradient-to-r from-white to-blue-50 transition ${
          error ? "border-red-400" : "border-blue-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
} 