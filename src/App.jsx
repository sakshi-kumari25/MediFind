import React, { useState } from 'react';
import { Navigation, Sun, Moon, TrendingDown, Milestone, Award } from 'lucide-react';
import { regionalHospitals, SERVICE_LABELS } from './data/hospitalData';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import CompareMatrix from './components/CompareMatrix';
import HospitalCard from './components/HospitalCard';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedService, setSelectedService] = useState('mri'); 
  const [maxDistance, setMaxDistance] = useState(15);
  const [sortBy, setSortBy] = useState('price');

  const [comparedHospitals, setComparedHospitals] = useState([]);
  const [bookingSlot, setBookingSlot] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState('');

  // Interactive popup states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModeDefault, setAuthModeDefault] = useState(false); // true = login form, false = register form

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
      return matchesName && matchesLoc && h.distance <= (locationQuery ? 999 : maxDistance);
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

  const stats = (() => {
    if (!filteredHospitals || filteredHospitals.length === 0) {
      return { lowest: null, avgDist: '0.0', topRated: 'None' };
    }
    const prices = filteredHospitals.map(h => h.prices?.[selectedService]).filter(p => typeof p === 'number');
    const lowest = prices.length > 0 ? Math.min(...prices) : null;
    const avgDist = (filteredHospitals.reduce((sum, h) => sum + h.distance, 0) / filteredHospitals.length).toFixed(1);
    
   const topRatedHospital = filteredHospitals.reduce((best, currentHospital) => {
      const currentPrice = currentHospital.prices?.[selectedService] || 99999;
      const bestPrice = best?.prices?.[selectedService] || 99999;
      
      if (!best || currentHospital.rating > best.rating || (currentHospital.rating === best.rating && currentPrice < bestPrice)) {
        return currentHospital;
      }
      return best;
    }, filteredHospitals[0]);

    const topRated = topRatedHospital ? topRatedHospital.name : 'None';

    return { lowest, avgDist, topRated };
  })();

  return (
    <div className={`min-h-screen font-sans text-left flex flex-col pb-24 relative transition-colors ${darkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-zinc-900'}`}>
      
      <Header 
        onDetectLocation={detectLiveLocation} 
        gpsLoading={gpsLoading} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onOpenAuth={(isLoginScreen) => {
          setAuthModeDefault(isLoginScreen);
          setIsAuthOpen(true);
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {currentLocationName && (
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/30 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold text-emerald-600">
            <Navigation size={12} fill="currentColor" /> Location Locked: {currentLocationName}
          </div>
        )}

        <FilterPanel 
          locationQuery={locationQuery} setLocationQuery={setLocationQuery}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedService={selectedService} setSelectedService={setSelectedService}
          maxDistance={maxDistance} setMaxDistance={setMaxDistance}
          sortBy={sortBy} setSortBy={setSortBy}
        />

        {filteredHospitals.length > 0 && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 text-left animate-in fade-in duration-200">
            {/* Card A: Lowest Cost Marker */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center space-x-3 shadow-xs transition-colors">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl"><TrendingDown size={16} /></div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Best Price Found</span>
                <span className="text-sm font-black text-zinc-950 dark:text-white">
                  {stats.lowest != null ? `₹${stats.lowest}` : 'N/A'}
                </span>
              </div>
            </div>

            {/* Card B: Distance Averages Calculator */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center space-x-3 shadow-xs transition-colors">
              <div className="p-2.5 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl"><Milestone size={16} /></div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Avg Proximity</span>
                <span className="text-sm font-black text-zinc-950 dark:text-white">{stats.avgDist} km</span>
              </div>
            </div>

            {/* Card C: Highest Ranked Unit Node */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center space-x-3 shadow-xs transition-colors">
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl"><Award size={16} /></div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Top Quality Center</span>
                <span className="text-xs font-bold truncate block max-w-[150px] text-zinc-950 dark:text-white">{stats.topRated}</span>
              </div>
            </div>
          </div>
        )}

        <CompareMatrix 
          comparedHospitals={comparedHospitals} 
          selectedService={selectedService} 
          toggleCompare={toggleCompare} 
          setComparedHospitals={setComparedHospitals} 
        />

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-700 px-1">Listings ({filteredHospitals.length})</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredHospitals.map((hospital) => (
              <HospitalCard 
                key={hospital.id} hospital={hospital} selectedService={selectedService} 
                isCompared={comparedHospitals.some(h => h.id === hospital.id)} onToggleCompare={toggleCompare} 
                onSelectSlot={(h, t) => { setBookingConfirmed(false); setBookingSlot({ hospital: h.name, hospitalObj: h, time: t, test: selectedService }); }} 
                serviceLabel={SERVICE_LABELS[selectedService]} 
              />
            ))}
          </div>
        </div>
      </main>

      <BookingModal bookingSlot={bookingSlot} patientName={patientName} patientPhone={patientPhone} bookingConfirmed={bookingConfirmed} onSetName={setPatientName} onSetPhone={setPatientPhone} onConfirm={() => setBookingConfirmed(true)} onClose={() => { setBookingSlot(null); setBookingConfirmed(false); setPatientName(''); setPatientPhone(''); }} />
      
      {/* Anchored Authentication Modal View Overlay */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialIsLogin={authModeDefault}
      />
    </div>
  );
}