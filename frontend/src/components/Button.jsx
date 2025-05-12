import React from "react";

const base =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:ring-blue-400",
  secondary:
    "bg-gray-200 text-blue-700 hover:bg-blue-100 focus:ring-blue-200",
  danger:
    "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  success:
    "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400",
  warning:
    "bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300",
};

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 