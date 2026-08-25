import React, { useState, useEffect } from 'react';
import { Zap, QrCode, Navigation, Clock, Calendar, CheckCircle2, ShieldCheck, MapPin, Share2, Download, X, Car, ArrowLeft } from 'lucide-react';

export default function BookingPassModal({ booking, isOpen, onClose, onViewAllBookings }) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(45 * 60); // 45 minutes countdown in seconds

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !booking) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleShare = () => {
    navigator.clipboard.writeText(`e-charge Booking Pass: ${booking.id} at ${booking.stationName} on ${booking.timeSlot}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNavigate = () => {
    const query = encodeURIComponent(`${booking.stationName} ${booking.stationAddress}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-brand-500/40 shadow-2xl bg-stone-950/95 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Back / Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white border border-stone-800 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hubs</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header Badge */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-amber-300 text-xs font-bold border border-brand-500/40 mb-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Bay Locked & Reserved</span>
          </div>
          <div className="flex justify-center my-2">
            <div className="bg-white/95 px-3 py-1.5 rounded-xl border border-brand-400/40 shadow-md">
              <img src="/logo.png" alt="e-charge Logo" className="h-8 w-auto object-contain" />
            </div>
          </div>
          <p className="text-xs text-stone-400 font-mono">Booking Ref: <strong className="text-amber-300">{booking.id}</strong></p>
        </div>

        {/* Boarding-Pass Style Card */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-700/80 overflow-hidden shadow-xl">
          {/* Top Pass Section */}
          <div className="p-5 border-b border-dashed border-stone-700/80 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Charging Hub</span>
              <h3 className="text-base font-bold text-white mt-0.5">{booking.stationName}</h3>
              <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>{booking.stationAddress}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase block">Reserved Bay</span>
                <span className="text-lg font-black text-amber-400 font-mono">Bay #{booking.bayNumber}</span>
              </div>
              <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase block">Speed Plan</span>
                <span className="text-sm font-bold text-amber-300 font-mono">{booking.speedPlan}</span>
                <span className="text-[10px] text-stone-400 block">({booking.powerKw})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-stone-400 uppercase block">Date & Time</span>
                <span className="text-xs font-bold text-white font-mono">{booking.date}</span>
                <span className="text-xs text-amber-300 font-mono block">{booking.timeSlot}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase block">Vehicle</span>
                <span className="text-xs font-semibold text-stone-200">{booking.carSnapshot}</span>
                <span className="text-[10px] text-stone-400 block font-mono">{booking.connectorType}</span>
              </div>
            </div>
          </div>

          {/* Countdown & QR Code Section */}
          <div className="p-5 bg-stone-950/90 text-center space-y-4">
            
            {/* Live Arrival Countdown */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-stone-900 border border-stone-800">
              <div className="flex items-center gap-2 text-left">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Arrival Window</span>
                  <span className="text-xs text-stone-300">Bay held for 15 min buffer</span>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-lg font-black text-amber-300">{timeFormatted}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl ring-4 ring-brand-500/30 relative group">
              <div className="w-40 h-40 bg-stone-950 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
                {/* SVG QR Code Pattern */}
                <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-90">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        (i % 2 === 0 || i % 3 === 0 || i === 0 || i === 4 || i === 20 || i === 24)
                          ? 'bg-amber-400'
                          : 'bg-stone-850'
                      }`}
                    />
                  ))}
                </div>
                {/* Center Pulse Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-lg bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-stone-800 font-bold mt-1.5 block">
                SCAN AT BAY #{booking.bayNumber}
              </span>
            </div>

            <p className="text-[11px] text-stone-400">
              Hold phone near charger RFID reader or scan QR to unlock connector immediately.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={handleNavigate}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>Start Navigation</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>{copied ? 'Pass Link Copied!' : 'Share Pass'}</span>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onViewAllBookings}
            className="text-amber-400 hover:underline font-semibold"
          >
            View in My Bookings →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
