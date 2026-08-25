import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Zap, Navigation, MapPin, Battery, Star, Shield, ExternalLink, Sparkles, ChevronRight, Calendar } from 'lucide-react';

export default function InteractiveMap({ stations, selectedStation, onSelectStation, onBookStation }) {
  const { user, remainingRange } = useAuth();
  const [hoveredStation, setHoveredStation] = useState(null);

  // Helper to determine reachability status
  const getReachability = (distanceKm) => {
    if (distanceKm <= remainingRange * 0.5) return 'safe';
    if (distanceKm <= remainingRange) return 'moderate';
    return 'out';
  };

  const currentDisplayStation = selectedStation || hoveredStation;

  return (
    <div className="space-y-4">
      {/* Interactive Radar Map Canvas */}
      <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel border border-brand-500/30 shadow-2xl bg-[#0e0c08] flex flex-col">
        
        {/* Map Header Overlay */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-stone-950/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-brand-500/30 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Live EV Radar Network</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-500/20 text-amber-300 border border-brand-500/30 font-bold">
            Radius: {remainingRange} km
          </span>
        </div>

        {/* Map Radar Grid Canvas */}
        <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center select-none">
          
          {/* Radar concentric range circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-[180px] h-[180px] rounded-full border border-amber-500/20" />
            <div className="w-[320px] h-[320px] rounded-full border border-orange-500/30 border-dashed" />
            <div className="w-[460px] h-[460px] rounded-full border border-yellow-500/20" />
            <div className="w-[600px] h-[600px] rounded-full border border-stone-800/40" />
          </div>

          {/* Dynamic Range Area Overlay based on remainingRange */}
          <div
            className="absolute rounded-full bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent border-2 border-brand-500/40 pointer-events-none transition-all duration-700 ease-out shadow-[0_0_60px_rgba(245,158,11,0.2)]"
            style={{
              width: `${Math.min(580, Math.max(160, remainingRange * 4.2))}px`,
              height: `${Math.min(580, Math.max(160, remainingRange * 4.2))}px`,
            }}
          />

          {/* Center Vehicle Marker (User Car Location) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-amber-400 opacity-40"></span>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-brand-500/50 text-stone-950 ring-4 ring-amber-400/20">
                <Navigation className="w-5 h-5 fill-stone-950 rotate-45" />
              </div>
            </div>
            <div className="mt-1.5 px-2.5 py-1 rounded-md bg-stone-950/95 border border-brand-500/40 text-[10px] font-bold text-amber-300 whitespace-nowrap shadow-md">
              📍 Current Car Location: {user?.car?.model || 'My EV'} ({remainingRange} km range)
            </div>
          </div>

          {/* Interactive Station Pins */}
          {stations.map((station) => {
            const reachability = getReachability(station.distanceKm);
            const isReachable = station.distanceKm <= remainingRange;
            const isSelected = selectedStation?.id === station.id;
            const isHovered = hoveredStation?.id === station.id;

            // Compute relative marker styling based on reachability
            let markerColor = 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-stone-950 ring-amber-400/40 shadow-brand-500/50';
            let badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';

            if (reachability === 'moderate') {
              markerColor = 'bg-gradient-to-tr from-orange-500 to-amber-500 text-stone-950 ring-orange-400/40 shadow-orange-500/50';
              badgeBg = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
            } else if (reachability === 'out') {
              markerColor = 'bg-stone-800 text-stone-500 ring-stone-800/20 shadow-none opacity-40';
              badgeBg = 'bg-stone-900 text-stone-500 border-stone-800';
            }

            return (
              <div
                key={station.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                style={{
                  top: `${station.coordinates.y}%`,
                  left: `${station.coordinates.x}%`,
                }}
                onMouseEnter={() => setHoveredStation(station)}
                onMouseLeave={() => setHoveredStation(null)}
                onClick={() => onSelectStation(station)}
              >
                {/* Pin Icon */}
                <div
                  className={`relative flex items-center justify-center transition-transform duration-200 ${
                    isSelected || isHovered ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                >
                  {isReachable && (
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400/30"></span>
                  )}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ring-2 ${markerColor} transition`}
                  >
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                </div>

                {/* Pin Distance Label */}
                <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${badgeBg}`}>
                    {station.distanceKm} km
                  </span>
                </div>
              </div>
            );
          })}

          {/* Selected Station Floating Card */}
          {currentDisplayStation && (
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-stone-950/95 backdrop-blur-md rounded-2xl p-4 border border-brand-500/40 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate">{currentDisplayStation.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/20 text-amber-300 font-bold shrink-0">
                      {currentDisplayStation.distanceKm} km away
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 truncate mt-0.5">{currentDisplayStation.address}</p>
                  
                  <div className="flex items-center gap-3 text-[11px] text-stone-300 mt-2">
                    <span className="text-electric-yellow font-bold">⚡ {currentDisplayStation.powerKw} kW Speed</span>
                    <span>•</span>
                    <span className="text-amber-300 font-medium">
                      🟢 {currentDisplayStation.availablePoints} of {currentDisplayStation.totalPoints} Points Available
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookStation(currentDisplayStation)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs font-mono shadow-lg shadow-brand-500/25 flex items-center gap-1.5 shrink-0 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Slot</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Booking Action Button placed under the Map */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-stone-900 to-orange-500/10 border-2 border-brand-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-md">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>Ready to Charge Your {user?.car?.model || 'EV'}?</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/20 text-amber-300 font-bold border border-brand-500/30">
                Range Safe
              </span>
            </h3>
            <p className="text-xs text-amber-200/70 mt-0.5">
              Select a station within your {remainingRange} km radius to reserve an available charging bay in advance.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (stations.length > 0) {
              onBookStation(stations[0]);
            }
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition transform active:scale-95 shrink-0"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Charging Slot Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
