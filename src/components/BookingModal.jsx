import React from 'react';
import { X, CheckCircle2, User, Phone } from 'lucide-react';

export default function BookingModal({ bookingSlot, patientName, patientPhone, bookingConfirmed, onSetName, onSetPhone, onConfirm, onClose }) {
  if (!bookingSlot) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 relative border border-zinc-100 shadow-2xl space-y-4">
        <button onClick={onClose} type="button" className="absolute right-4 top-4 p-1 text-zinc-400 hover:text-zinc-700 rounded-lg cursor-pointer">
          <X className="h-5 w-5" />
        </button>

        {bookingConfirmed ? (
          <div className="text-center py-4 space-y-4">
            <div className="mx-auto h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-zinc-900 tracking-tight">Appointment Confirmed</h3>
              <p className="text-xs text-zinc-500">Your scheduling parameters are logged successfully.</p>
            </div>
            <div className="bg-zinc-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-zinc-200/60 font-medium text-zinc-700">
              <p><span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-2">Facility:</span> {bookingSlot.hospital}</p>
              <p><span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-2">Procedure:</span> <span className="uppercase text-zinc-600">{bookingSlot.test}</span></p>
              <p><span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-2">Timeline:</span> {bookingSlot.time}</p>
              <p><span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-2">Patient Name:</span> {patientName}</p>
              <p><span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mr-2">Contact:</span> {patientPhone}</p>
            </div>
            <button onClick={onClose} type="button" className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer">
              Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); onConfirm(); }} className="space-y-4 text-left">
            <div>
              <h3 className="font-black text-base text-zinc-950 tracking-tight">Verify Session Scheduling</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{bookingSlot.hospital} ({bookingSlot.time})</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Patient Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <input type="text" required value={patientName} onChange={(e) => onSetName(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-violet-500/20 bg-zinc-50 focus:bg-white" placeholder="Patient legal name" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Contact Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <input type="tel" required pattern="[0-9]{10}" value={patientPhone} onChange={(e) => onSetPhone(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-violet-500/20 bg-zinc-50 focus:bg-white" placeholder="10-digit mobile number" />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-zinc-400 block uppercase tracking-wider">Estimated Cost</span>
                <span className="text-lg font-black text-zinc-950">₹{bookingSlot.hospitalObj?.prices[bookingSlot.test] || 'N/A'}</span>
              </div>
              <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer">
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}