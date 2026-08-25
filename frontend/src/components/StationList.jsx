import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Zap, MapPin, BatteryCharging, Star, ShieldCheck, Clock, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, Navigation } from 'lucide-react';

export default function StationList({ stations, onSelectStation, onBookStation }) {
  const { user, remainingRange } = useAuth();

  if (stations.length === 0) {
    return (
      <div className="rounded-3xl glass-panel p-8 sm:p-12 text-center border border-dashed border-stone-800 bg-stone-950/60">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-brand-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">
          No Charging Stations Found In Range
        </h3>
        <p className="text-xs text-stone-400 max-w-md mx-auto mb-6">
          No charging hubs match your currently entered remaining range of <strong className="text-amber-300">{remainingRange} km</strong> or selected filter criteria.
        </p>
        <p className="text-xs text-amber-200/80 bg-stone-900/80 border border-stone-800 p-3 rounded-xl inline-block">
          💡 Try increasing the range slider above or switching connector filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-400" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            Reachable Charging Stations ({stations.length})
          </h3>
        </div>
        <span className="text-[11px] text-stone-400 font-mono">
          Sorted by nearest to your vehicle
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stations.map((station) => {
          const isCompatible = user?.car?.connector
            ? station.connectors.some(c => 
                c.toLowerCase().includes(user.car.connector.toLowerCase()) || 
                user.car.connector.toLowerCase().includes(c.toLowerCase())
              )
            : true;

          const reachPercent = Math.min(100, Math.round((station.distanceKm / remainingRange) * 100));

          return (
            <div
              key={station.id}
              onClick={() => onSelectStation(station)}
              className="relative overflow-hidden rounded-2xl glass-panel p-5 border border-stone-800/80 hover:border-brand-500/50 bg-stone-950/80 hover:bg-stone-900/90 transition-all duration-200 group shadow-lg cursor-pointer"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                {/* Station Info */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-stone-900 text-stone-300 border border-stone-800">
                      {station.operator}
                    </span>

                    {/* Compatibility Badge */}
                    {isCompatible ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-green-500/15 text-green-400 border border-green-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Fits {user?.car?.connector || 'EV'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-800 text-stone-400 border border-stone-700">
                        Adapter May Be Needed
                      </span>
                    )}

                    {/* Rating */}
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 ml-auto sm:ml-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{station.rating}</span>
                    </span>
                  </div>

                  {/* Name & Address */}
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition truncate">
                      {station.name}
                    </h4>
                    <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{station.address}</span>
                    </p>
                  </div>

                  {/* Charging Points Available & Specifications */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                    
                    {/* Points Available Pill */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 border border-brand-500/25">
                      <span className={`w-2 h-2 rounded-full ${(station.availablePoints ?? station.baysAvailable ?? 4) > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                      <span className="font-bold text-white">
                        {station.availablePoints ?? station.baysAvailable ?? 4} / {station.totalPoints ?? station.baysTotal ?? 8}
                      </span>
                      <span className="text-[11px] text-stone-400">Points Available</span>
                    </div>

                    {/* Power Speed Pill */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-electric-yellow font-bold font-mono">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{station.powerKw ?? station.maxPowerKw ?? 150} kW Max</span>
                    </div>

                    {/* Price per kWh in INR (₹) */}
                    <div className="text-stone-300 font-mono text-[11px]">
                      <span className="text-stone-500">Tariff: </span>
                      <span className="font-bold text-amber-400">₹{station.pricePerKwh ?? station.baseRate ?? 18.5} / kWh</span>
                    </div>
                  </div>

                  {/* Supported Connectors */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {station.connectors.map((c, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          user?.car?.connector && c.toLowerCase().includes(user.car.connector.toLowerCase())
                            ? 'bg-brand-500/20 text-amber-300 border-brand-500/40 font-bold'
                            : 'bg-stone-900 text-stone-400 border-stone-800'
                        }`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Distance & Book Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800">
                  <div className="text-left sm:text-right">
                    <span className="text-lg font-black font-mono text-white block">
                      {station.distanceKm} <span className="text-xs font-normal text-stone-400">km</span>
                    </span>
                    <span className="text-[10px] text-stone-500 block font-mono">
                      Uses {reachPercent}% remaining range
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookStation(station);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs font-mono shadow-md shadow-brand-500/25 flex items-center gap-1.5 transition transform active:scale-95"
                  >
                    <span>Book Bay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
