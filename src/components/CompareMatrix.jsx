import React from 'react';
import { ArrowRightLeft, X, Star, Download } from 'lucide-react';
import { SERVICE_LABELS } from '../data/hospitalData';

export default function CompareMatrix({ comparedHospitals, selectedService, toggleCompare, setComparedHospitals }) {
  if (!comparedHospitals || comparedHospitals.length === 0) return null;

  // Professional feature: Dynamically generate plain-text matrix summaries for interviewer portfolios
  const handleExportText = () => {
    let report = '=== MEDIFIND SUITE COMPARISON REPORT ===\n';
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Diagnostic Procedure: ${SERVICE_LABELS[selectedService] || selectedService}\n\n`;

    comparedHospitals.forEach((h, idx) => {
      report += `[Facility Matrix Entry #${idx + 1}] ${h.name}\n`;
      report += `Location Area: ${h.location}\n`;
      report += `Proximity Range: ${h.distance} km\n`;
      report += `Quality Rating: ${h.rating} ★\n`;
      report += `Accreditation Badge: ${h.accreditation}\n`;
      report += `Procedure Fee Rate: ₹${h.prices[selectedService] || 'N/A'}\n`;
      report += `---------------------------------------\n\n`;
    });

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const dynamicUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    
    downloadLink.href = dynamicUrl;
    downloadLink.download = `medifind-comparison-matrix.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(dynamicUrl);
  };

  return (
    <div className="bg-zinc-900 text-white rounded-2xl p-5 border border-zinc-800 shadow-lg space-y-4 animate-in fade-in transition-colors">
      
      {/* Header Row Toolbar Control Block */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center space-x-2">
          <ArrowRightLeft className="h-4 w-4 text-violet-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Live Comparison Matrix ({comparedHospitals.length}/3)
          </h3>
        </div>
        
        {/* RIGHT ACTION ITEMS: EXPORT BUTTON + CLEAR ALL */}
        <div className="flex items-center space-x-4">
          <button 
            type="button"
            onClick={handleExportText}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
          >
            <Download size={13} /> Export Report (.txt)
          </button>
          
          <span className="text-zinc-700">|</span>
          
          <button 
            onClick={() => setComparedHospitals([])} 
            className="text-xs text-zinc-400 hover:text-white underline font-semibold cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>
      
      {/* Comparison Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparedHospitals.map((hospital) => (
          <div 
            key={hospital.id} 
            className="bg-zinc-800/60 border border-zinc-700/80 rounded-xl p-4 relative flex flex-col justify-between hover:border-zinc-600 transition-colors"
          >
            <button 
              onClick={() => toggleCompare(hospital)} 
              className="absolute right-3 top-3 text-zinc-400 hover:text-rose-400 p-0.5 rounded transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>

            <div className="space-y-3">
              <div>
                <h4 className="font-extrabold text-sm truncate text-zinc-100 pr-5 tracking-tight">
                  {hospital.name}
                </h4>
                <p className="text-[10px] text-zinc-400 mt-0.5 truncate font-medium">
                  {hospital.location}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-700/60 space-y-1.5 text-xs text-zinc-300 font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Distance</span> 
                  <span className="text-zinc-100 font-bold">{hospital.distance} km</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Quality</span> 
                  <span className="text-zinc-200 font-semibold truncate max-w-[120px]">{hospital.accreditation}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Rating</span> 
                  <span className="text-amber-400 font-bold flex items-center">
                    <Star size={11} className="fill-amber-500 text-amber-500 mr-0.5" />
                    {hospital.rating} ★
                  </span>
                </div>

                <div className="flex justify-between items-center text-violet-400 pt-2 border-t border-dashed border-zinc-700/60 mt-1 font-bold">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                    {SERVICE_LABELS[selectedService] || 'Scan Cost'}
                  </span> 
                  <span className="text-white text-sm font-black">₹{hospital.prices[selectedService] || 'N/A'}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}