import React from 'react';
import { Download } from 'lucide-react';

export default function ExportData({ comparedHospitals, selectedService }) {
  if (comparedHospitals.length === 0) return null;

  const handleExportText = () => {
    let outputText = `=== MEDIFIND COMPARISON MATRIX REPORT ===\nGenerated On: ${new Date().toLocaleString()}\n\n`;

    comparedHospitals.forEach((h, index) => {
      outputText += `[Facility Details Node #${index + 1}]\n`;
      outputText += `Name: ${h.name}\n`;
      outputText += `Location: ${h.location}\n`;
      outputText += `Distance Proximity: ${h.distance} km\n`;
      outputText += `Quality Score: ${h.rating} / 5.0\n`;
      outputText += `Accreditation Block: ${h.accreditation}\n`;
      outputText += `Target Service Cost: ₹${h.prices[selectedService]}\n`;
      outputText += `-------------------------------------------\n\n`;
    });

    // Generate runtime browser text payload link object download sequence triggers
    const fileBlob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const dynamicUrl = URL.createObjectURL(fileBlob);
    const linkElement = document.createElement('a');
    
    linkElement.href = dynamicUrl;
    linkElement.download = `medifind-comparison-report.txt`;
    document.body.appendChild(linkElement);
    linkElement.click();
    
    // Clean memory layer footprint hooks instantly
    document.body.removeChild(linkElement);
    URL.revokeObjectURL(dynamicUrl);
  };

  return (
    <button
      onClick={handleExportText}
      className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
    >
      <Download size={13} /> Export Matrix Report (.txt)
    </button>
  );
}