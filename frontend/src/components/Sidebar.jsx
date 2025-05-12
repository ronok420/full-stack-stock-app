import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../constants/navigation";

export default function Sidebar({ onToggleTheme, theme }) {
  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col justify-between shadow-2xl transition-colors duration-300">
      <div>
        <div className="flex items-center gap-2 px-6 py-6 text-2xl font-extrabold tracking-tight">
          <span className="text-blue-600 dark:text-blue-400">StockApp</span>
          <span className="text-lg">🔎</span>
        </div>
        <nav className="flex flex-col gap-2 mt-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-lg rounded-l-full transition-all duration-200 font-semibold
                ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
     
    </aside>
  );
} 