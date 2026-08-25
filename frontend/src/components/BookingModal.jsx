import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SPEED_PLANS } from '../data/mockData';
import { Zap, Clock, Calendar, X, BatteryCharging, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Info, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ station, isOpen, onClose, onBookingSuccess }) {
  const { user, remainingRange, addBooking } = useAuth();

  const [bookingStep, setBookingStep] = useState(1); // 1 = Config & Slots, 2 = Review & Confirm
  const [selectedPlanId, setSelectedPlanId] = useState('rapid');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState(station?.timeSlots?.[0]?.time || '11:00 AM - 11:30 AM');
  const [targetSoc, setTargetSoc] = useState(80); // Target state of charge 80%

  if (!isOpen || !station) return null;

  const currentPlan = SPEED_PLANS.find(p => p.id === selectedPlanId) || SPEED_PLANS[1];

  // Battery & Time Calculations
  const batteryCapacity = user?.car?.capacity || 60;
  // Estimate current battery % from remaining range
  const currentSocEstimated = Math.min(90, Math.max(10, Math.round((remainingRange / 350) * 100)));
  const socDifference = Math.max(10, targetSoc - currentSocEstimated);
  const kwhNeeded = ((socDifference / 100) * batteryCapacity).toFixed(1);

  // Parse power kW from plan string
  const powerKw = parseInt(currentPlan.power) || 50;
  const estimatedChargingMinutes = Math.max(8, Math.round((kwhNeeded / powerKw) * 60));

  // Cost calculation
  const estimatedEnergyCost = Math.round(Number(kwhNeeded) * currentPlan.ratePerKwh);
  const totalCost = estimatedEnergyCost + currentPlan.reservationFee;

  const handleBack = () => {
    if (bookingStep === 2) {
      setBookingStep(1);
    } else {
      onClose();
    }
  };

  const handleConfirm = () => {
    const newBooking = addBooking({
      stationId: station.id,
      stationName: station.name,
      stationAddress: station.address,
      distanceKm: station.distanceKm,
      date: selectedDate === 'Today' ? 'Today, Aug 24' : selectedDate === 'Tomorrow' ? 'Tomorrow, Aug 25' : 'Aug 26',
      timeSlot: selectedSlot,
      speedPlan: currentPlan.name,
      powerKw: currentPlan.power,
      connectorType: user?.car?.connector || 'CCS2',
      targetCharge: `${targetSoc}%`,
      kwhEstimate: kwhNeeded,
      chargeDurationMins: estimatedChargingMinutes,
      totalCost,
      carSnapshot: `${user?.car?.brand} ${user?.car?.model}`
    });

    // Trigger celebration confetti in amber/gold
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FFD600', '#FF6B00', '#FBBF24']
      });
    } catch {}

    setBookingStep(1);
    onBookingSuccess(newBooking);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-brand-500/40 shadow-2xl bg-stone-950/95 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation Bar with Explicit Back and Close Buttons */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-5">
          {/* Back Option Button */}
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white border border-stone-800 hover:border-brand-500/40 text-xs font-bold transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{bookingStep === 2 ? 'Back to Options' : 'Back to Stations'}</span>
          </button>

          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${bookingStep === 1 ? 'bg-amber-400' : 'bg-stone-700'}`} />
            <span className={`w-2 h-2 rounded-full ${bookingStep === 2 ? 'bg-amber-400' : 'bg-stone-700'}`} />
            <span className="text-[11px] font-mono text-stone-400">Step {bookingStep} of 2</span>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800 transition"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Station Info Header */}
        <div className="mb-6 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-amber-300 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Advance Bay Reservation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">{station.name}</h2>
          <p className="text-xs text-stone-400 mt-0.5">
            {station.address} • <span className="text-amber-300 font-mono font-semibold">{station.distanceKm} km away</span>
          </p>
        </div>

        {/* STEP 1: Select Speed Plan & Time Slot */}
        {bookingStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            {/* Speed Plan Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-200/90 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-brand-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Select Charging Speed Plan</span>
                </label>
                <span className="text-xs text-stone-400">Power tailored to your stop</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPEED_PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  const isSupported = station.supportedPlans.includes(plan.id);

                  return (
                    <button
                      key={plan.id}
                      type="button"
                      disabled={!isSupported}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                        !isSupported
                          ? 'opacity-40 bg-stone-950 border-stone-850 cursor-not-allowed'
                          : isSelected
                          ? 'bg-stone-900 border-brand-500 ring-2 ring-brand-500/30 shadow-lg shadow-brand-950'
                          : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-sm text-white">{plan.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-brand-500/20 text-amber-300 border border-brand-500/30 font-semibold">
                            {plan.power}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-2">{plan.description}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                        <span className="text-amber-300 font-mono font-bold">₹{plan.ratePerKwh}/kWh</span>
                        <span className="text-stone-400 text-[11px]">80% in {plan.typicalTime80}</span>
                      </div>

                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-500 text-stone-950 flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choose Date & Slot */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-200/90 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-electric-yellow/20 text-electric-yellow flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Select Booking Date & Slot</span>
                </label>
                <span className="text-xs text-amber-400 font-mono font-semibold">Guaranteed Bay Lock</span>
              </div>

              {/* Date Selector */}
              <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 mb-3 max-w-sm">
                {['Today', 'Tomorrow', 'Day After'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                      selectedDate === d
                        ? 'bg-stone-800 text-amber-300 font-bold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Time Slot Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {station.timeSlots.map((slot) => {
                  const isBooked = slot.status === 'booked';
                  const isSelected = selectedSlot === slot.time;

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-mono transition text-center border ${
                        isBooked
                          ? 'bg-stone-950/40 text-stone-600 border-stone-850 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black border-amber-400 shadow-md shadow-brand-500/20'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
                      }`}
                    >
                      <div>{slot.time.split(' - ')[0]}</div>
                      <div className="text-[10px] opacity-80 font-sans">
                        {isBooked ? 'Reserved' : 'Available'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions with Back and Proceed to Summary */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingStep(2)}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition"
              >
                <span>Continue to Summary & Cost</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Review, Battery Target & Confirm */}
        {bookingStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            {/* Target Battery Level */}
            <div className="bg-stone-950/90 rounded-2xl p-4 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-bold uppercase tracking-wider">Target Battery Level</span>
                <div className="flex gap-2">
                  {[80, 90, 100].map(soc => (
                    <button
                      key={soc}
                      type="button"
                      onClick={() => setTargetSoc(soc)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                        targetSoc === soc
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {soc}% {soc === 80 && '★ Optimal'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Telemetry Calculation Summary */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800 text-center">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">Energy Needed</span>
                  <span className="text-sm font-bold text-white font-mono">+{kwhNeeded} kWh</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">Est. Charge Time</span>
                  <span className="text-sm font-bold text-amber-300 font-mono">~{estimatedChargingMinutes} mins</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">Total Cost</span>
                  <span className="text-sm font-bold text-electric-yellow font-mono">₹{totalCost}</span>
                </div>
              </div>

              {/* Order Summary details */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-1">
                <div className="flex justify-between">
                  <span>Speed Plan:</span>
                  <span className="font-semibold text-white">{currentPlan.name} ({currentPlan.power})</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Slot:</span>
                  <span className="font-semibold text-amber-300 font-mono">{selectedDate}, {selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bay Lock Fee:</span>
                  <span className="font-mono text-white">₹{currentPlan.reservationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Energy Tariff Estimate ({kwhNeeded} kWh @ ₹{currentPlan.ratePerKwh}):</span>
                  <span className="font-mono text-white">₹{estimatedEnergyCost}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions with Back and Confirm */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setBookingStep(1)}
                className="py-4 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-bold transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 text-base transition-all transform active:scale-[0.99]"
              >
                <Zap className="w-5 h-5 fill-stone-950" />
                <span>Confirm & Lock Charging Bay (₹{totalCost})</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Free cancellation up to 15 minutes before your booked time slot.</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
