import React from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "../hooks/useTheme";
import { useSidebar } from "../hooks/useSidebar";

export default function DashboardLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile menu button */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white lg:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onToggleTheme={toggleTheme} theme={theme} />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={close}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        {children}
      </main>
    </div>
  );
} 