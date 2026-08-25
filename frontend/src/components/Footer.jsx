import React from 'react';
import { Zap, ShieldCheck, PhoneCall, Heart, SunMedium, Award, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function Footer({ onOpenTariff, onOpenGarage, onOpenContact }) {
  return (
    <footer className="border-t border-brand-500/20 bg-stone-950/90 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Us & Emergency Support Callout */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl glass-panel border-2 border-brand-500/40 bg-gradient-to-r from-amber-950/50 via-stone-900/80 to-orange-950/50 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Contact Info */}
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 shrink-0 shadow-lg shadow-brand-500/30">
                <PhoneCall className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/20 text-amber-300 border border-brand-500/30">
                    Contact Us & Support
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  Have Questions or Need EV Assistance?
                </h3>
                <p className="text-xs text-amber-200/70 mt-0.5">
                  Reach out directly for slot reservations, technical help, or partner inquiries.
                </p>
              </div>
            </div>

            {/* Right: Pranav's Direct Contact Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Contact Person */}
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-950/90 border border-brand-500/30 text-xs font-semibold text-white">
                <User className="w-4 h-4 text-amber-400" />
                <span>Pranav</span>
              </div>

              {/* Phone */}
              <a
                href="tel:9392843511"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black font-mono shadow-md shadow-brand-500/20 transition group"
              >
                <Phone className="w-4 h-4 text-stone-950" />
                <span>9392843511</span>
              </a>

              {/* Email */}
              <a
                href="mailto:pranavponuganti0504@gmail.com"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-brand-500/40 text-amber-300 hover:text-white text-xs font-bold font-mono transition shadow-md"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                <span>pranavponuganti0504@gmail.com</span>
              </a>
            </div>

          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="bg-white/95 px-3 py-1.5 rounded-2xl border border-brand-400/40 shadow-md inline-block">
              <img
                src="/logo.png"
                alt="e-charge Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Empowering electric vehicle drivers with advance slot reservations, intelligent range filtering, and ultra-fast charging speeds.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <SunMedium className="w-4 h-4" />
              <span>100% Green Renewable Energy</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200/90">Driver Portal</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenGarage} className="hover:text-amber-300 transition">
                  EV Garage & Vehicle Settings
                </button>
              </li>
              <li>
                <button onClick={onOpenTariff} className="hover:text-amber-300 transition">
                  Speed Plans & Pricing Tariffs
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-amber-300 transition text-amber-400 font-semibold">
                  Contact Us (Pranav)
                </button>
              </li>
              <li>
                <span className="text-stone-500">Plug & Charge Auto-Billing</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Us Details Section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200/90">Contact Us</h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-white">Name: Pranav</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:9392843511" className="font-mono text-amber-300 hover:underline">
                  9392843511
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <a href="mailto:pranavponuganti0504@gmail.com" className="font-mono text-amber-200/80 hover:underline break-all">
                  pranavponuganti0504@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Trust & Certification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200/90">Certifications</h4>
            <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-200">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">ISO 15118 & OCPP 2.0.1</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Encrypted payment gateways and automated protocol handshakes for seamless vehicle charging.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} e-charge Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenContact} className="hover:text-amber-300 transition text-stone-400">
              Contact Us: Pranav (9392843511)
            </button>
            <span>•</span>
            <span className="hover:text-amber-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-amber-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
