import React from 'react';
import { Activity, Compass } from 'lucide-react';
import ThemeToggle from './ThemeToggle'; // Import your custom toggle component

export default function Header({ onDetectLocation, gpsLoading, darkMode, setDarkMode, onOpenAuth }) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-xs transition-colors text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Node Branding Logo */}
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-violet-600" />
          <span className="text-lg font-black tracking-tight text-zinc-950 dark:text-white">
            MediFind Suite
          </span>
        </div>

        {/* Right Actions Cluster Container */}
        <div className="flex items-center space-x-3">
          
          {/* 🔑 DEDICATED SIGN IN TRIGGER BUTTON */}
          <button
            type="button"
            onClick={() => onOpenAuth(true)}
            className="text-xs font-extrabold text-zinc-600 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 px-2 py-2 transition-colors cursor-pointer"
          >
            Sign In
          </button>

          {/* 📝 DEDICATED SIGN UP TRIGGER BUTTON */}
          <button
            type="button"
            onClick={() => onOpenAuth(false)}
            className="text-xs font-extrabold text-zinc-600 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-xl border border-zinc-200/40 dark:border-zinc-700 transition-all cursor-pointer"
          >
            Sign Up
          </button>

          {/* Your Dedicated Theme Toggle File Embedded Safely */}
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Locate Button Control */}
          <button
            onClick={onDetectLocation}
            disabled={gpsLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-violet-700 disabled:bg-zinc-400 cursor-pointer transition-all shrink-0"
            type="button"
          >
            <Compass className={`h-3.5 w-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
            {gpsLoading ? 'Locating...' : '📍 Detect My Location'}
          </button>
        </div>

      </div>
    </header>
  );
}