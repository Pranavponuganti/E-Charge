import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, Zap, X, QrCode, Navigation, Trash2, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MyBookings({ isOpen, onClose, onViewPass }) {
  const { bookings, cancelBooking } = useAuth();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-brand-500/40 shadow-2xl bg-stone-950/95 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Back / Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-5">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white border border-stone-800 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header */}
        <div className="mb-6 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-amber-300 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Driver Reservations</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">My Charging Bookings</h2>
          <p className="text-xs text-stone-400 mt-0.5">Manage your active locked bays, digital QR passes, and charging history.</p>
        </div>

        {/* Content */}
        {bookings.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white">No Active Reservations</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              You haven't reserved any charging bays yet. Adjust your car range on the dashboard to locate and lock your next charging slot.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs shadow-md shadow-brand-500/20 inline-flex items-center gap-1.5"
            >
              <span>Explore Stations Near Me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-stone-900/90 rounded-2xl p-4 sm:p-5 border border-stone-800 hover:border-brand-500/40 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-brand-500/15 border border-brand-500/30">
                        {b.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{b.status}</span>
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">{b.stationName}</h4>
                    <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-500" />
                      <span>{b.stationAddress}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-white block">
                      Bay #{b.bayNumber}
                    </span>
                    <span className="text-[11px] text-amber-300 font-mono font-semibold block">
                      {b.speedPlan}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Schedule</span>
                    <span className="font-semibold text-white font-mono">{b.date}</span>
                    <span className="text-[11px] text-amber-300 font-mono block font-bold">{b.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Vehicle & Power</span>
                    <span className="font-semibold text-stone-200">{b.carSnapshot}</span>
                    <span className="text-[11px] text-stone-400 font-mono block">{b.powerKw}</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-stone-400 block uppercase">Est. Total</span>
                    <span className="font-bold text-white font-mono">₹{b.totalCost}</span>
                    <span className="text-[10px] text-stone-400 block">Target: {b.targetCharge}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 gap-2">
                  <button
                    type="button"
                    onClick={() => cancelBooking(b.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 p-2 rounded-lg hover:bg-red-500/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Reservation</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const query = encodeURIComponent(`${b.stationName} ${b.stationAddress}`);
                        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onViewPass(b)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-brand-500/20 transition"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View QR Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
