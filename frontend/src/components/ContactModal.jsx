import React from 'react';
import { User, Phone, Mail, X, Sparkles, MessageSquare, ShieldCheck, MapPin, Send } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-2xl bg-stone-950/95 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/20 text-amber-300 text-xs font-bold border border-brand-500/40 mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Support & Contact</span>
          </div>

          <div className="flex justify-center mb-3">
            <div className="bg-white/95 px-3 py-1.5 rounded-2xl border border-brand-400/40 shadow-md">
              <img src="/logo.png" alt="e-charge Logo" className="h-8 w-auto object-contain" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white uppercase tracking-wider">
            Contact e-charge
          </h3>
          <p className="text-xs text-amber-200/70 mt-1">
            Need help with slot reservations, EV charging bays, or station hosting? Reach out directly!
          </p>
        </div>

        {/* Contact Details Card */}
        <div className="space-y-3.5 bg-stone-900/90 rounded-2xl p-5 border border-brand-500/30 shadow-xl">
          
          {/* Name */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-950/80 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Contact Person</span>
              <p className="text-sm font-bold text-white">Pranav</p>
            </div>
          </div>

          {/* Contact Number */}
          <a
            href="tel:9392843511"
            className="flex items-center justify-between p-3 rounded-xl bg-stone-950/80 hover:bg-stone-900 border border-stone-800 hover:border-brand-500/50 transition group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-brand-500/30 group-hover:scale-105 transition">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Contact Number</span>
                <p className="text-sm font-bold text-amber-300 font-mono">+91 9392843511</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-brand-500/20 text-amber-300 text-xs font-bold border border-brand-500/30 group-hover:bg-brand-500 group-hover:text-stone-950 transition">
              Call Now
            </span>
          </a>

          {/* Email Address */}
          <a
            href="mailto:pranavponuganti0504@gmail.com"
            className="flex items-center justify-between p-3 rounded-xl bg-stone-950/80 hover:bg-stone-900 border border-stone-800 hover:border-brand-500/50 transition group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30 group-hover:scale-105 transition">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Email Address</span>
                <p className="text-xs sm:text-sm font-bold text-amber-200/90 truncate font-mono">
                  pranavponuganti0504@gmail.com
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/30 group-hover:bg-orange-500 group-hover:text-stone-950 transition shrink-0 ml-2">
              Send Email
            </span>
          </a>

        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-bold text-xs transition border border-stone-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
