import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
      title="Toggle Interface Theme"
    >
      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}