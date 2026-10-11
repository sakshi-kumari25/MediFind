import React from 'react';
import { MapPin, Search } from 'lucide-react';

export default function FilterPanel({ 
  locationQuery, setLocationQuery, searchQuery, setSearchQuery, 
  selectedService, setSelectedService, maxDistance, setMaxDistance, sortBy, setSortBy 
}) {
  return (
    <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 p-5 shadow-sm sm:grid-cols-2 md:grid-cols-4 text-left transition-colors">
      
      {/* CITY AREA INPUT */}
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          City / Area Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <input 
            type="text" 
            value={locationQuery} 
            onChange={(e) => setLocationQuery(e.target.value)} 
            placeholder="Type 'Noida'..." 
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 py-2 pl-9 pr-4 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20" 
          />
        </div>
      </div>

      {/* HOSPITAL SEARCH INPUT */}
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Search Hospital
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search name..." 
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 py-2 pl-9 pr-4 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20" 
          />
        </div>
      </div>

      {/* PROCEDURE DROPDOWN SELECTOR */}
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Diagnostic Test
        </label>
        <select 
          value={selectedService} 
          onChange={(e) => setSelectedService(e.target.value)} 
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 p-2 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
        >
          <option value="xray">Digital X-Ray Scan</option>
          <option value="blood_test">Blood Lab Panel (CBC)</option>
          <option value="mri">MRI Scan</option>
        </select>
      </div>

      {/* RADIUS RANGE SLIDER & SORT ACTIONS */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span>Max Distance</span>
          <span className="text-violet-600 dark:text-violet-400 font-extrabold">{maxDistance} km</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="25" 
          value={maxDistance} 
          onChange={(e) => setMaxDistance(Number(e.target.value))} 
          className="w-full accent-violet-600 dark:accent-violet-500 cursor-pointer h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none mt-1" 
        />
        
        {/* INLINE PIPELINE SORT BUTTONS */}
        <div className="flex items-center justify-between pt-1 text-[10px] border-t border-zinc-100 dark:border-zinc-800">
          <span className="font-bold text-zinc-400 dark:text-zinc-500 uppercase">Sort By</span>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-md font-bold border border-zinc-200/40 dark:border-zinc-700/60">
            {[ 
              ['price', 'Cost'], 
              ['distance', 'Dist'], 
              ['rating', 'Rate'] 
            ].map(([k, l]) => (
              <button 
                key={k} 
                type="button" 
                onClick={() => setSortBy(k)} 
                className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                  sortBy === k 
                    ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-xs' 
                    : 'text-zinc-400 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}