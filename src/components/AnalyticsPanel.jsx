import React from 'react';
import { TrendingDown, Award, Milestones } from 'lucide-react';

export default function AnalyticsPanel({ filteredHospitals, selectedService }) {
  if (filteredHospitals.length === 0) return null;

  // Compute live analytical bounds safely from the data array pipeline
  const prices = filteredHospitals.map(h => h.prices[selectedService] || 0);
  const lowestPrice = Math.min(...prices);
  const avgDistance = (filteredHospitals.reduce((sum, h) => sum + h.distance, 0) / filteredHospitals.length).toFixed(1);
  const topRated = filteredHospitals.reduce((max, h) => h.rating > max.rating ? h : max, filteredHospitals[0]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-xl"><TrendingDown size={18} /></div>
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Best Regional Price</span>
          <span className="text-sm font-black dark:text-white">₹{lowestPrice}</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
        <div className="p-2.5 bg-violet-50 dark:bg-violet-950/50 text-violet-600 rounded-xl"><Milestones size={18} /></div>
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Average Proximity</span>
          <span className="text-sm font-black dark:text-white">{avgDistance} km</span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center space-x-3 shadow-xs">
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 rounded-xl"><Award size={18} /></div>
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Top Quality Node</span>
          <span className="text-sm font-bold truncate block max-w-[150px] dark:text-white">{topRated.name}</span>
        </div>
      </div>
    </div>
  );
}