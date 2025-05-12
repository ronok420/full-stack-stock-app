import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/", icon: "📊" },
  { name: "Analytics", path: "/analytics", icon: "📈" },
  { name: "Data Table", path: "/table", icon: "📋" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Sidebar({ onToggleTheme, theme }) {
  return (
    <aside className="h-screen w-60 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col justify-between shadow-2xl">
      <div>
        <div className="flex items-center gap-2 px-6 py-6 text-2xl font-extrabold tracking-tight">
          <span className="text-blue-400">StockVista</span>
          <span className="text-lg">🔎</span>
        </div>
        <nav className="flex flex-col gap-2 mt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-lg rounded-l-full transition-all duration-200 font-semibold hover:bg-blue-800/60 hover:text-blue-200 ${
                  isActive ? "bg-blue-700/80 text-blue-100" : "text-gray-200"
                }`
              }
              end={item.path === "/"}
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="px-6 py-6 flex flex-col gap-4">
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold transition"
        >
          {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </aside>
  );
} 