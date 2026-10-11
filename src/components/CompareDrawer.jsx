import React, { useState } from 'react';
import { Search, MapPin, Compass, Navigation, Activity, ArrowRightLeft } from 'lucide-react';
import { regionalHospitals, SERVICE_LABELS } from './data/hospitalData';
import HospitalCard from './components/HospitalCard';
import BookingModal from './components/BookingModal';
import CompareDrawer from './components/CompareDrawer'; // Import our new slide drawer

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedService, setSelectedService] = useState('xray');
  const [maxDistance, setMaxDistance] = useState(15);
  const [sortBy, setSortBy] = useState('price');

  // Matrix state tracking configuration
  const [comparedHospitals, setComparedHospitals] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controls comparison drawer open state

  const [bookingSlot, setBookingSlot] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState('');

  const detectLiveLocation = () => {
    setGpsLoading(true);
    setTimeout(() => {
      setCurrentLocationName('Greater Noida, Uttar Pradesh');
      setLocationQuery('Noida');
      setGpsLoading(false);
    }, 1200);
  };

  const filteredHospitals = regionalHospitals
    .filter((h) => {
      const matchesName = h.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLoc = h.location.toLowerCase().includes(locationQuery.toLowerCase()) || 
                         h.region.toLowerCase().includes(locationQuery.toLowerCase());
      const boundaryMax = locationQuery ? 999 : maxDistance;
      return matchesName && matchesLoc && h.distance <= boundaryMax;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return (a.prices[selectedService] || 0) - (b.prices[selectedService] || 0);
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const toggleCompare = (hospital) => {
    setComparedHospitals((prev) => 
      prev.some(h => h.id === hospital.id) ? prev.filter(h => h.id !== hospital.id) : prev.length < 3 ? [...prev, hospital] : prev
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 font-sans text-left flex flex-col pb-24 relative">
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-violet-600" />
            <span className="text-lg font-black tracking-tight text-zinc-950">MediFind Suite</span>
          </div>
          <button
            onClick={detectLiveLocation}
            disabled={gpsLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-violet-700 disabled:bg-zinc-400 cursor-pointer"
          >
            <Compass className={`h-3.5 w-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
            {gpsLoading ? 'Locating...' : '📍 Detect My Location'}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {currentLocationName && (
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/30 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold text-emerald-600">
            <Navigation size={12} fill="currentColor" /> Location Locked: {currentLocationName}
          </div>
        )}

        {/* INPUT OPTIONS PANEL */}
        <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">City / Area Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} placeholder="Type 'Noida'..." className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-xs focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Search Hospital</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search name..." className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-xs focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Diagnostic Test</label>
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-xs focus:outline-none cursor-pointer">
              <option value="xray">Digital X-Ray Scan</option>
              <option value="blood_test">Blood Lab Panel (CBC)</option>
              <option value="mri">MRI Scan</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400"><span>Max Distance: {maxDistance} km</span></div>
            <input type="range" min="1" max="25" value={maxDistance} onChange={(e) => setMaxDistance(Number(e.target.value))} className="w-full accent-violet-600 cursor-pointer h-1.5 bg-zinc-100 rounded-lg appearance-none mt-1" />
            <div className="flex items-center justify-between pt-1 text-[10px] border-t border-zinc-100">
              <span className="font-bold text-zinc-400 uppercase">Sort By</span>
              <div className="flex bg-zinc-100 p-0.5 rounded-md font-bold">
                {[
                  ['price', 'Cost'], 
                  ['distance', 'Dist'], 
                  ['rating', 'Rate']
                ].map(([k, l]) => (
                  <button key={k} type="button" onClick={() => setSortBy(k)} className={`px-2 py-0.5 rounded text-[9px] ${sortBy === k ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-400'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-700 px-1">Discovered Center Listings ({filteredHospitals.length})</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredHospitals.map((hospital) => (
              <HospitalCard 
                key={hospital.id} 
                hospital={hospital} 
                selectedService={selectedService} 
                isCompared={comparedHospitals.some(h => h.id === hospital.id)} 
                onToggleCompare={toggleCompare} 
                onSelectSlot={(h, t) => { setBookingConfirmed(false); setBookingSlot({ hospital: h.name, hospitalObj: h, time: t, test: selectedService }); }} 
                serviceLabel={SERVICE_LABELS[selectedService]} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* 🛎️ DYNAMIC FLOATING ACTION FLOATING SELECTION BUBBLE BUTTON */}
      {comparedHospitals.length > 0 && (
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center space-x-2.5 shadow-2xl tracking-wide transition-transform active:scale-95 cursor-pointer border border-zinc-800"
        >
          <ArrowRightLeft size={14} className="text-violet-400" />
          <span>Open Comparison Deck</span>
          <span className="bg-violet-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black">
            {comparedHospitals.length}
          </span>
        </button>
      )}

      {/* POPUP MODAL HOOK INTERACTION LAYERS */}
      <BookingModal bookingSlot={bookingSlot} patientName={patientName} patientPhone={patientPhone} bookingConfirmed={bookingConfirmed} onSetName={setPatientName} onSetPhone={setPatientPhone} onConfirm={() => setBookingConfirmed(true)} onClose={() => { setBookingSlot(null); setBookingConfirmed(false); setPatientName(''); setPatientPhone(''); }} />
      
      {/* SIDE PANEL COMPARISON MATRIX MATRIX INJECTION */}
      <CompareDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        comparedHospitals={comparedHospitals} 
        selectedService={selectedService} 
        onToggleCompare={toggleCompare} 
        onClearCompare={() => { setComparedHospitals([]); setIsDrawerOpen(false); }} 
      />
    </div>
  );
}