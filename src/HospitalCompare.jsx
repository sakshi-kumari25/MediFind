
import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  X,
  Compass,
  Navigation,
  CheckCircle2,
  Activity,
  ArrowRightLeft,
  Calendar,
  User,
  Phone,
} from 'lucide-react';

import { regionalHospitals } from './data/hospitalData';

const SERVICE_LABELS = {
  xray: 'Digital X-Ray Scan',
  blood_test: 'Blood Lab Panel (CBC)',
  mri: 'MRI Scan',
};

const DEMO_SLOTS = ['09:30 AM', '11:00 AM', '03:15 PM'];

export default function HospitalCompare() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedService, setSelectedService] = useState('xray');
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState('price');

  const [comparedHospitals, setComparedHospitals] = useState([]);
  const [bookingSlot, setBookingSlot] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const [gpsLoading, setGpsLoading] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState('');

  // Demo location detection: replace with browser geolocation for real GPS.
  const detectLiveLocation = () => {
    setGpsLoading(true);

    setTimeout(() => {
      setCurrentLocationName('Greater Noida, Uttar Pradesh');
      setLocationQuery('Noida');
      setGpsLoading(false);
    }, 1200);
  };

  // Filter and sort hospital records.
  const filteredHospitals = regionalHospitals
    .filter((hospital) => {
      const matchesHospitalName = hospital.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const query = locationQuery.toLowerCase().trim();

      const matchesLocationText =
        !query ||
        hospital.location.toLowerCase().includes(query) ||
        hospital.region.toLowerCase().includes(query);

      const matchesDistance = hospital.distance <= maxDistance;

      return (
        matchesHospitalName &&
        matchesLocationText &&
        matchesDistance
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        const priceA = Number(a.prices?.[selectedService] ?? Infinity);
        const priceB = Number(b.prices?.[selectedService] ?? Infinity);
        return priceA - priceB;
      }

      if (sortBy === 'distance') {
        return a.distance - b.distance;
      }

      if (sortBy === 'rating') {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }

      return 0;
    });

  const getServicePrice = (hospital) =>
    hospital.prices?.[selectedService] ??
    hospital.prices?.blood_test ??
    null;

  // Add or remove hospitals from comparison; maximum 3.
  const toggleCompare = (hospital) => {
    setComparedHospitals((previous) => {
      if (previous.some((item) => item.id === hospital.id)) {
        return previous.filter((item) => item.id !== hospital.id);
      }

      if (previous.length >= 3) {
        alert('You can compare up to 3 hospitals at a time.');
        return previous;
      }

      return [...previous, hospital];
    });
  };

  const openBookingModal = (hospital, time) => {
    setBookingConfirmed(false);
    setPatientName('');
    setPatientPhone('');

    setBookingSlot({
      hospital: hospital.name,
      hospitalObj: hospital,
      time,
      test: selectedService,
      price: getServicePrice(hospital),
    });
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    const cleanedPhone = patientPhone.replace(/\D/g, '');

    if (!patientName.trim()) {
      alert('Please enter the patient name.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      alert('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    setBookingConfirmed(true);
  };

  const handleCloseModal = () => {
    setBookingSlot(null);
    setBookingConfirmed(false);
    setPatientName('');
    setPatientPhone('');
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-slate-50 p-4 sm:p-6 font-sans text-left text-zinc-900 pb-36">
      {/* HEADER */}
      <header className="mb-6 flex flex-col gap-3 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-zinc-950">
            <Activity className="h-6 w-6 text-violet-600" />
            MediFind Suite
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Search, filter, compare, and explore medical facilities.
          </p>
        </div>

        <button
          onClick={detectLiveLocation}
          disabled={gpsLoading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-violet-700 disabled:bg-zinc-400"
          type="button"
        >
          <Compass
            className={`h-3.5 w-3.5 ${
              gpsLoading ? 'animate-spin' : ''
            }`}
          />
          {gpsLoading ? 'Locating...' : '📍 Detect My Location'}
        </button>
      </header>

      {/* CURRENT LOCATION */}
      {currentLocationName && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold text-emerald-700">
          <Navigation size={12} fill="currentColor" />
          Demo Location: {currentLocationName}
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <section className="mb-6 grid gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:grid-cols-2 md:grid-cols-4">
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            City / Area Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Type Noida, Delhi..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-violet-200 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Search Hospital
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facility name..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-violet-200 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Diagnostic Test
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-xs focus:outline-none sm:text-sm"
          >
            <option value="xray">Digital X-Ray Scan</option>
            <option value="blood_test">Blood Lab Panel (CBC)</option>
            <option value="mri">MRI Scan</option>
          </select>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              <span>Max Distance</span>
              <span className="text-violet-600">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-100 accent-violet-600"
            />
          </div>

          <div className="flex items-center justify-between border-t border-zinc-100 pt-2">
            <span className="text-[10px] font-bold uppercase text-zinc-400">
              Sort by
            </span>
            <div className="flex rounded-lg bg-zinc-100 p-0.5 text-[10px] font-bold">
              {[
                ['price', 'Cost'],
                ['distance', 'Distance'],
                ['rating', 'Rating'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSortBy(key)}
                  className={`rounded-md px-2 py-1 transition-all ${
                    sortBy === key
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOSPITAL LISTINGS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold tracking-tight text-zinc-900">
            Discovered Listings ({filteredHospitals.length})
          </h2>
          <span className="text-xs text-zinc-400">
            {comparedHospitals.length}/3 compared
          </span>
        </div>

        {filteredHospitals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-16 text-center text-xs font-medium text-zinc-500">
            No hospitals matched your filters. Try clearing the search
            or increasing the distance.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredHospitals.map((hospital) => {
              const isCompared = comparedHospitals.some(
                (item) => item.id === hospital.id
              );
              const servicePrice = getServicePrice(hospital);

              return (
                <article
                  key={hospital.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                          <Activity className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="break-words text-sm font-extrabold text-zinc-900">
                            {hospital.name}
                          </h3>
                          <p className="mt-1 flex items-start gap-1 text-xs text-zinc-500">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            {hospital.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-zinc-50 p-3">
                        <p className="text-[10px] font-bold uppercase text-zinc-400">
                          Distance
                        </p>
                        <p className="mt-1 text-sm font-bold text-zinc-800">
                          {hospital.distance} km
                        </p>
                      </div>
                      <div className="rounded-xl bg-zinc-50 p-3">
                        <p className="text-[10px] font-bold uppercase text-zinc-400">
                          Listed Price
                        </p>
                        <p className="mt-1 text-sm font-bold text-violet-700">
                          {servicePrice == null
                            ? 'Not available'
                            : `₹${Number(servicePrice).toLocaleString('en-IN')}`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-zinc-600">
                      <p className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-500" />
                        Rating: {hospital.rating ?? 'Not listed'}
                      </p>
                      <p className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        {hospital.accreditation || 'Accreditation not listed'}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        Region: {hospital.region || 'Not listed'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-zinc-100 p-5">
                    <button
                      type="button"
                      onClick={() => toggleCompare(hospital)}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                        isCompared
                          ? 'border-violet-600 bg-violet-50 text-violet-700'
                          : 'border-zinc-200 text-zinc-600 hover:border-violet-300 hover:bg-violet-50'
                      }`}
                    >
                      {isCompared ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <ArrowRightLeft className="h-4 w-4" />
                      )}
                      {isCompared ? 'Added to Comparison' : 'Compare Hospital'}
                    </button>

                    <p className="text-[10px] text-zinc-400">
                      Sample appointment slots:
                    </p>

                    {DEMO_SLOTS.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => openBookingModal(hospital, time)}
                        className="flex w-full items-center justify-between rounded-xl border border-violet-100 bg-violet-50/50 px-3 py-2.5 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
                      >
                        <span className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          {time}
                        </span>
                        <span>Select</span>
                      </button>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* SIDE-BY-SIDE COMPARISON MATRIX */}
      <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black text-zinc-900">
              Side-by-Side Comparison
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Compare up to three facilities using your selected test.
            </p>
          </div>

          {comparedHospitals.length > 0 && (
            <button
              type="button"
              onClick={() => setComparedHospitals([])}
              className="self-start rounded-lg px-3 py-2 text-xs font-bold text-zinc-500 hover:bg-zinc-100"
            >
              Clear All
            </button>
          )}
        </div>

        {comparedHospitals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-10 text-center text-sm text-zinc-500">
            No clinics added to comparison. Select “Compare Hospital”
            on any listing above.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {comparedHospitals.map((hospital) => {
              const price = getServicePrice(hospital);

              return (
                <div
                  key={hospital.id}
                  className="relative rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <button
                    type="button"
                    aria-label={`Remove ${hospital.name}`}
                    onClick={() =>
                      setComparedHospitals((previous) =>
                        previous.filter((item) => item.id !== hospital.id)
                      )
                    }
                    className="absolute right-3 top-3 rounded-lg p-1.5 text-zinc-400 hover:bg-white hover:text-zinc-800"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <h3 className="mb-4 pr-8 text-sm font-extrabold text-zinc-900">
                    {hospital.name}
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="text-zinc-400">Location</p>
                      <p className="mt-1 font-semibold text-zinc-700">
                        {hospital.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-zinc-400">Distance</p>
                      <p className="mt-1 font-bold">
                        {hospital.distance} km
                      </p>
                    </div>

                    <div>
                      <p className="text-zinc-400">
                        {SERVICE_LABELS[selectedService]} price
                      </p>
                      <p className="mt-1 text-lg font-black text-violet-700">
                        {price == null
                          ? 'Not available'
                          : `₹${Number(price).toLocaleString('en-IN')}`}
                      </p>
                    </div>

                    <div>
                      <p className="text-zinc-400">Rating</p>
                      <p className="mt-1 font-semibold">
                        {hospital.rating ?? 'Not listed'}
                      </p>
                    </div>

                    <div>
                      <p className="text-zinc-400">Accreditation</p>
                      <p className="mt-1 font-semibold">
                        {hospital.accreditation || 'Not listed'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBookingModal(hospital, DEMO_SLOTS[0])}
                    className="mt-5 w-full rounded-xl bg-violet-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700"
                  >
                    Confirm Session Appointment
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* APPOINTMENT MODAL */}
      {bookingSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/60 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="my-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  id="booking-title"
                  className="text-xl font-black text-zinc-900"
                >
                  {bookingConfirmed
                    ? 'Demo Booking Confirmed'
                    : 'Confirm Session Appointment'}
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Demonstration appointment workflow
                </p>
              </div>

              <button
                type="button"
                aria-label="Close modal"
                onClick={handleCloseModal}
                className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!bookingConfirmed ? (
              <>
                <div className="mb-5 space-y-3 rounded-2xl bg-zinc-50 p-4 text-xs">
                  <div>
                    <p className="text-zinc-400">Facility</p>
                    <p className="mt-1 font-bold text-zinc-800">
                      {bookingSlot.hospital}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">Procedure</p>
                    <p className="mt-1 font-bold text-zinc-800">
                      {SERVICE_LABELS[bookingSlot.test]}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">Selected time</p>
                    <p className="mt-1 font-bold text-zinc-800">
                      {bookingSlot.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">Listed price</p>
                    <p className="mt-1 text-lg font-black text-violet-700">
                      {bookingSlot.price == null
                        ? 'Not available'
                        : `₹${Number(bookingSlot.price).toLocaleString('en-IN')}`}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-zinc-600">
                      Patient Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter patient name"
                        autoComplete="name"
                        required
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-violet-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-zinc-600">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <input
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="10-digit Indian mobile number"
                        autoComplete="tel-national"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        required
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-violet-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed text-amber-700">
                    This is a frontend demo. It does not submit personal
                    information to a hospital or create a real appointment.
                  </p>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 rounded-xl border border-zinc-200 py-3 text-xs font-bold text-zinc-600 hover:bg-zinc-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-violet-600 py-3 text-xs font-bold text-white shadow-md hover:bg-violet-700"
                    >
                      Confirm Demo
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-5 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <h3 className="text-lg font-black text-zinc-900">
                  Demo Confirmation Created
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  No real hospital appointment has been made.
                </p>

                <div className="my-5 rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500">
                    Demo token
                  </p>
                  <p className="mt-2 font-mono text-xl font-black tracking-wider text-violet-800">
                    MED-LIVE-2026
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-700"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="mt-10 border-t border-zinc-200 pt-5 text-center text-xs text-zinc-400">
        MediFind Suite — verify prices, ratings, accreditation, and
        appointment availability with the hospital before relying on them.
      </footer>
    </div>
  );
}
