import React from 'react';
import { SPEED_PLANS } from '../data/mockData';
import { Zap, X, ShieldCheck, BatteryCharging, Check, Clock, ArrowLeft } from 'lucide-react';

export default function TariffModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-brand-500/40 shadow-2xl bg-stone-950/95 my-8"
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

        <div className="mb-6 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-amber-300 text-xs font-bold mb-2">
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>Network Tariff Transparency</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">e-charge Speed Plans & Pricing</h2>
          <p className="text-xs text-stone-400 mt-0.5">Select the charging speed that matches your schedule and stops.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SPEED_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-stone-900/90 rounded-2xl p-5 border border-stone-800 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base text-white">{plan.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-amber-300 font-mono font-bold border border-brand-500/30">
                    {plan.power}
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-2">
                  {plan.badge}
                </span>
                <p className="text-xs text-stone-400">{plan.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Energy Tariff Rate:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">₹{plan.ratePerKwh} / kWh</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Advance Bay Lock Fee:</span>
                  <span className="font-mono font-semibold text-white">₹{plan.reservationFee} / slot</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Typical 10% → 80% Time:</span>
                  <span className="font-mono text-stone-200">{plan.typicalTime80}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Includes 100% certified renewable solar/wind mix</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-400 flex items-center justify-between">
          <span>⚡ No surge pricing during peak hours. Advance booking locks your price and bay.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
