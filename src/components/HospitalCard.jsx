import React from 'react';
import { MapPin, Star, Activity } from 'lucide-react';

export default function HospitalCard({ hospital, selectedService, isCompared, onToggleCompare, onSelectSlot, serviceLabel }) {
  const currentPrice = hospital.prices[selectedService] || 'N/A';

  return (
    <div className={`border rounded-xl p-4 flex flex-row items-stretch justify-between shadow-xs transition-all text-left ${
      isCompared 
        ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-800 dark:border-zinc-700' 
        : 'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700'
    }`}>
      
      {/* LEFT AREA: CONTENT DATA LAYER */}
      <div className="flex flex-col justify-between flex-1 pr-4 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-50 dark:bg-blue-950/40 p-1 rounded-md text-blue-600 dark:text-blue-400 shrink-0">
              <Activity size={14} />
            </div>
            <h3 className="font-extrabold text-sm tracking-tight leading-snug line-clamp-1 text-zinc-900 dark:text-white">
              {hospital.name}
            </h3>
          </div>

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center">
            <MapPin size={11} className="mr-1 text-zinc-400 dark:text-zinc-500 shrink-0" />
            <span className="truncate max-w-[190px]">{hospital.location}</span>
          </p>
        </div>

        {/* Vertical Metric Alignment Parameters with High-Contrast Dark Mode Overrides */}
        <div className="space-y-1 text-[11px] font-medium">
          <p className="flex items-center">
            <span className="w-16 block font-bold text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Distance</span>
            <span className="text-zinc-700 dark:text-zinc-200 font-bold">{hospital.distance} km</span>
          </p>
          <p className="flex items-center">
            <span className="w-16 block font-bold text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Rating</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center">
              <Star size={10} className="fill-amber-500 text-amber-500 mr-0.5" />
              {hospital.rating}
            </span>
          </p>
          <p className="flex items-center">
            <span className="w-16 block font-bold text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Quality</span>
            <span className="text-zinc-600 dark:text-zinc-300 font-semibold truncate max-w-[130px]">{hospital.accreditation}</span>
          </p>
          <p className="flex items-center">
            <span className="w-16 block font-bold text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Region</span>
            <span className="text-zinc-600 dark:text-zinc-300 capitalize">{hospital.region}</span>
          </p>
        </div>

        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-1">
          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase block">{serviceLabel}</span>
          <span className="text-sm font-black text-zinc-950 dark:text-white">₹{currentPrice}</span>
        </div>
      </div>

      {/* RIGHT AREA: VERTICAL ROW SLOTS SELECTOR */}
      <div className="w-[125px] border-l border-zinc-100 dark:border-zinc-800 pl-4 flex flex-col justify-between shrink-0">
        <div className="space-y-1.5">
          <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">Sample Slots</span>
          {hospital.slots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onSelectSlot(hospital, time)}
              className="w-full text-center py-1.5 bg-blue-50/60 hover:bg-blue-600 text-blue-600 hover:text-white dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white rounded-lg text-[10px] font-extrabold tracking-wide transition-all border border-blue-100/30 dark:border-blue-900/40 cursor-pointer"
            >
              Select
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onToggleCompare(hospital)}
          className={`w-full mt-3 text-center py-1 rounded-md text-[10px] font-bold tracking-wide transition-all border cursor-pointer ${
            isCompared
              ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900 shadow-sm'
              : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
          }`}
        >
          {isCompared ? '✓ Selected' : '⇄ Compare'}
        </button>
      </div>

    </div>
  );
}