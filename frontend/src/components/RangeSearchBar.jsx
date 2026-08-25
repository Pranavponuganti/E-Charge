import React from 'react';
import { useAuth } from '../context/AuthContext';
import { SPEED_PLANS } from '../data/mockData';
import { Gauge, Search, Filter, AlertTriangle, Zap, Check, MapPin, SlidersHorizontal, Sparkles, Battery, Car } from 'lucide-react';

export default function RangeSearchBar({
  searchQuery,
  setSearchQuery,
  selectedSpeedPlan,
  setSelectedSpeedPlan,
  matchConnectorOnly,
  setMatchConnectorOnly,
  viewMode,
  setViewMode,
  reachableCount,
  totalCount,
  onExploreStations
}) {
  const { user, remainingRange, setRemainingRange } = useAuth();

  const handleRangeChange = (val) => {
    const num = Math.max(5, Math.min(600, Number(val) || 0));
    setRemainingRange(num);
  };

  const getRangeStatus = () => {
    if (remainingRange <= 35) {
      return {
        color: 'text-orange-400 bg-orange-500/15 border-orange-500/40',
        text: 'Critical Battery Reserve',
        sub: 'Showing closest emergency high-speed charging bays along highways & city hubs'
      };
    }
    if (remainingRange <= 75) {
      return {
        color: 'text-amber-400 bg-amber-500/15 border-amber-500/40',
        text: 'Moderate Battery Range',
        sub: 'Recommended to reserve a bay within ~50 km radius'
      };
    }
    return {
      color: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/40',
      text: 'Optimal Range Coverage',
      sub: 'All stations within this radius are safely reachable'
    };
  };

  const status = getRangeStatus();

  return (
    <div className="space-y-4">
      {/* Primary Range Input Control Card */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-5 sm:p-7 border border-brand-500/30 shadow-2xl shadow-stone-950/40 bg-dark-card/90">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Range Input & Gauge */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-brand-500/40 flex items-center justify-center text-amber-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>Enter Your Vehicle's Current Remaining Range</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/20 text-amber-300 font-bold border border-brand-500/30">
                      Live Filter
                    </span>
                  </h2>
                  <p className="text-xs text-amber-200/70">
                    Enter the range of your vehicle to automatically fetch and display all reachable charging stations in real-time.
                  </p>
                </div>
              </div>

              <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                <span>{status.text}</span>
              </div>
            </div>

            {/* Range Slider + Direct Numeric Input */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={remainingRange}
                  onChange={(e) => handleRangeChange(e.target.value)}
                  className="w-full h-3.5 bg-stone-950/90 rounded-lg appearance-none cursor-pointer accent-brand-500 border border-stone-700 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-stone-500 font-mono mt-1.5">
                  <span className="text-orange-400 font-medium">10 km (Critical)</span>
                  <span>50 km (City)</span>
                  <span>100 km</span>
                  <span>150 km (Highway)</span>
                  <span className="text-amber-400 font-medium">250 km+</span>
                </div>
              </div>

              {/* Editable Number Input Box */}
              <div className="relative shrink-0 w-32">
                <input
                  type="number"
                  min="5"
                  max="600"
                  value={remainingRange}
                  onChange={(e) => handleRangeChange(e.target.value)}
                  className="w-full py-2.5 pl-3.5 pr-10 rounded-xl bg-stone-950/95 border-2 border-brand-500/50 text-amber-300 font-black font-mono text-center text-lg focus:outline-none focus:border-brand-400 shadow-inner"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
                  KM
                </span>
              </div>
            </div>

            {/* Quick Range Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-stone-400 font-semibold">Quick Presets:</span>
              {[25, 50, 75, 120, 180, 250].map((presetKm) => (
                <button
                  key={presetKm}
                  type="button"
                  onClick={() => setRemainingRange(presetKm)}
                  className={`text-[11px] font-mono px-2.5 py-0.5 rounded-lg border transition ${
                    remainingRange === presetKm
                      ? 'bg-brand-500 text-stone-950 font-bold border-brand-400 shadow-sm'
                      : 'bg-stone-950/80 text-stone-300 border-stone-800 hover:border-brand-500/40 hover:text-amber-300'
                  }`}
                >
                  {presetKm} km
                </button>
              ))}
            </div>
          </div>

          {/* Right: Smart Reachability Stats Box */}
          <div className="lg:w-72 p-4 rounded-2xl bg-gradient-to-br from-stone-950/90 to-stone-900/90 border border-brand-500/30 flex flex-col justify-between shrink-0 shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                <span>Hubs In Driving Range</span>
                <span className="text-amber-400 font-bold font-mono">
                  {reachableCount} of {totalCount}
                </span>
              </div>
              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(reachableCount / Math.max(1, totalCount)) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between">
              <div className="text-[11px] text-stone-400">
                <span>Connector Filter:</span>
                <span className="block font-semibold text-white truncate max-w-[120px]">
                  {user?.car?.connector || 'All Types'}
                </span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-amber-500/15 text-amber-300 border border-brand-500/30">
                100% Reachable
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Station Search Bar with Indian Placeholders */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 rounded-2xl glass-panel border border-stone-800 bg-stone-950/80">
        
        {/* Search for nearby stations Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
          <input
            type="text"
            placeholder="Search nearby stations (e.g. Hitec City, NH 44, Outer Ring Road, Tata Power, Jio-bp, Statiq)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Connector matching toggle */}
          <button
            type="button"
            onClick={() => setMatchConnectorOnly(!matchConnectorOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              matchConnectorOnly
                ? 'bg-brand-500/20 border-brand-500 text-amber-300'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
            title="Show only stations with your car's connector"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>My {user?.car?.connector || 'Connector'} Only</span>
          </button>

          {/* Speed Plan Dropdown Filter */}
          <div className="flex items-center bg-stone-900 rounded-xl border border-stone-800 p-1">
            <button
              onClick={() => setSelectedSpeedPlan('all')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                selectedSpeedPlan === 'all' ? 'bg-brand-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              All Speeds
            </button>
            <button
              onClick={() => setSelectedSpeedPlan('ultra')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                selectedSpeedPlan === 'ultra' ? 'bg-brand-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              ⚡ 150kW+
            </button>
            <button
              onClick={() => setSelectedSpeedPlan('rapid')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                selectedSpeedPlan === 'rapid' ? 'bg-brand-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              60-120kW
            </button>
          </div>

          {/* View Mode Toggle: Split / Cards / Map */}
          <div className="flex items-center bg-stone-900 rounded-xl border border-stone-800 p-1">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                viewMode === 'split' ? 'bg-stone-800 text-amber-300 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                viewMode === 'list' ? 'bg-stone-800 text-amber-300 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                viewMode === 'map' ? 'bg-stone-800 text-amber-300 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Full Map
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
