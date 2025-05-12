import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [theme, setTheme] = useState("dark");

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <Sidebar onToggleTheme={handleToggleTheme} theme={theme} />
      <main className="flex-1 overflow-y-auto p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        {children}
      </main>
    </div>
  );
} 