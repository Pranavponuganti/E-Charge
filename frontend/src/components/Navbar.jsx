import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Zap, Car, Calendar, LogOut, ChevronDown, Shield, Sliders, BatteryCharging, Sparkles, User, Search, MapPin, Gauge, PhoneCall } from 'lucide-react';

export default function Navbar({ onOpenGarage, onOpenBookings, onOpenTariff, onOpenContact }) {
  const { user, remainingRange, bookings, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeBookingsCount = bookings.filter(b => b.status === 'CONFIRMED').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-500/20 bg-dark-base/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/95 px-2.5 py-1.5 rounded-2xl shadow-lg shadow-brand-500/20 border border-brand-400/40 flex items-center justify-center hover:scale-105 transition">
              <img
                src="/logo.png"
                alt="e-charge Logo"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-brand-500/15 text-amber-400 border border-brand-500/30">
                  Smart EV Network
                </span>
              </div>
              <p className="text-[11px] text-amber-200/60 mt-0.5">Range-Aware Slot Booking</p>
            </div>
          </div>

          {/* Center: Live Vehicle & Dynamic Range Quick Pill */}
          {user && (
            <div className="hidden lg:flex items-center gap-3 bg-stone-950/90 border border-brand-500/25 px-4 py-2 rounded-2xl shadow-inner">
              <button
                onClick={onOpenGarage}
                className="flex items-center gap-2 text-left hover:text-amber-300 transition group"
                title="Click to manage car details"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{user.car?.brand} {user.car?.model}</span>
                    <span className="text-[10px] text-stone-400 font-normal">({user.car?.capacity} kWh)</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono font-medium">
                    {user.car?.connector}
                  </div>
                </div>
              </button>

              <div className="h-6 w-px bg-stone-800 mx-1" />

              {/* Remaining Range Quick Tag */}
              <div className="flex items-center gap-2 pl-1">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                <span className="text-xs text-stone-400">Current Range:</span>
                <span className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-brand-500/20 text-amber-300 border border-brand-500/40">
                  {remainingRange} km
                </span>
              </div>
            </div>
          )}

          {/* Right: Actions & User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Speed Tariffs Button */}
            <button
              onClick={onOpenTariff}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-200/80 hover:text-white bg-stone-950/80 hover:bg-stone-900 border border-stone-800 hover:border-brand-500/40 transition"
            >
              <BatteryCharging className="w-4 h-4 text-electric-yellow" />
              <span>Speed Plans</span>
            </button>

            {/* Contact Us Button */}
            <button
              onClick={onOpenContact}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:text-white bg-stone-950/80 hover:bg-stone-900 border border-brand-500/30 hover:border-brand-500/60 transition"
              title="Contact Pranav (9392843511)"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Contact Us</span>
            </button>

            {/* My Bookings Button */}
            <button
              onClick={onOpenBookings}
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-stone-900 to-stone-950 hover:bg-stone-800 border border-brand-500/30 text-white font-semibold text-xs transition shadow-sm"
            >
              <Calendar className="w-4 h-4 text-brand-400" />
              <span className="hidden sm:inline">My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-[11px] font-black animate-bounce shadow-md">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Account Icon on the Top Right End */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-stone-950 border border-brand-500/30 hover:border-brand-500 text-stone-200 transition shadow-md shadow-brand-500/10"
                  title="Account Details"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 flex items-center justify-center font-black text-xs text-stone-950 shadow-sm">
                    <User className="w-4 h-4 text-stone-950" />
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="font-bold text-white block max-w-[110px] truncate">{user.name}</span>
                    <span className="text-[10px] text-amber-400 block font-mono leading-none mt-0.5">{user.car?.model?.split(' ')[0] || 'EV'}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                </button>

                {/* Account Details Dropdown */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel border border-brand-500/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 bg-stone-950/98"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {/* Account Details Card Header */}
                    <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800/80 mb-2">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-black text-stone-950 text-sm">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                          <p className="text-[11px] text-amber-200/70 truncate">{user.email}</p>
                        </div>
                      </div>

                      {/* Registered Car Details Tag */}
                      <div className="pt-2 border-t border-stone-800/80 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-400">Registered Vehicle:</span>
                          <span className="font-bold text-amber-300">{user.car?.brand} {user.car?.model}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-400">Charger Type:</span>
                          <span className="font-mono text-electric-yellow font-semibold">{user.car?.connector}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-400">Battery Capacity:</span>
                          <span className="font-mono text-stone-300">{user.car?.capacity} kWh</span>
                        </div>
                      </div>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <button
                        onClick={onOpenGarage}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-stone-300 hover:text-white hover:bg-stone-900 transition"
                      >
                        <Car className="w-4 h-4 text-brand-400" />
                        <span>EV Garage & Vehicle Specs</span>
                      </button>

                      <button
                        onClick={onOpenBookings}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-stone-300 hover:text-white hover:bg-stone-900 transition"
                      >
                        <Calendar className="w-4 h-4 text-electric-yellow" />
                        <span>My Reserved Slots ({bookings.length})</span>
                      </button>

                      <button
                        onClick={onOpenTariff}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-stone-300 hover:text-white hover:bg-stone-900 transition"
                      >
                        <BatteryCharging className="w-4 h-4 text-orange-400" />
                        <span>Speed Tariffs & Plans</span>
                      </button>

                      <button
                        onClick={onOpenContact}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-amber-300 hover:text-white hover:bg-stone-900 transition"
                      >
                        <PhoneCall className="w-4 h-4 text-amber-400" />
                        <span>Contact Us (Pranav)</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-stone-800 mt-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
