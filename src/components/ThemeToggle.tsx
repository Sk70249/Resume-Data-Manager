import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-[#161B22] hover:bg-[#1C2128] transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Moon className="w-5 h-5 text-gray-400" />
      ) : (
        <Sun className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}