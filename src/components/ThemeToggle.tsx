"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "./icons";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      // Apply the theme immediately
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to dark theme
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
          isDark ? "translate-x-12" : "translate-x-1"
        }`}
      />
      <Sun className={`absolute left-2 h-4 w-4 text-yellow-400 transition-opacity ${
        isDark ? "opacity-0" : "opacity-100"
      }`} />
      <Moon className={`absolute right-2 h-4 w-4 text-blue-400 transition-opacity ${
        isDark ? "opacity-100" : "opacity-0"
      }`} />
    </button>
  );
}
