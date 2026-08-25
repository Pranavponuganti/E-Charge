import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EV_PRESETS, CONNECTOR_TYPES } from '../data/mockData';
import { Zap, ShieldCheck, BatteryCharging, ArrowRight, User, Mail, Phone, Lock, Car, Gauge, CheckCircle2, KeyRound } from 'lucide-react';

export default function AuthModal() {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form State with Indian defaults
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    carBrand: 'Tata',
    carModel: 'Nexon.ev Long Range',
    connectorType: 'CCS2',
    batteryCapacity: '45'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle brand change to update model options
  const handleBrandChange = (brand) => {
    const preset = EV_PRESETS.find(p => p.brand === brand);
    if (preset && preset.models.length > 0) {
      const defaultModel = preset.models[0];
      setFormData(prev => ({
        ...prev,
        carBrand: brand,
        carModel: defaultModel.name,
        connectorType: defaultModel.connector,
        batteryCapacity: defaultModel.capacity.toString()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        carBrand: brand
      }));
    }
  };

  // Handle model change to auto-fill capacity & connector
  const handleModelChange = (modelName) => {
    const preset = EV_PRESETS.find(p => p.brand === formData.carBrand);
    const modelObj = preset?.models.find(m => m.name === modelName);
    if (modelObj) {
      setFormData(prev => ({
        ...prev,
        carModel: modelName,
        connectorType: modelObj.connector,
        batteryCapacity: modelObj.capacity.toString()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        carModel: modelName
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      // Validate customer details
      if (!formData.name.trim() || !formData.email.trim()) {
        setError('Please fill in customer name and email address.');
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match. Please verify your confirm password.');
        return;
      }
      if (!formData.carBrand || !formData.carModel || !formData.connectorType) {
        setError('Please provide your EV car model and charger type.');
        return;
      }

      setLoading(true);
      const res = await signup(formData);
      setLoading(false);
      if (res && !res.success) {
        setError(res.error || 'Failed to create account.');
      }
    } else {
      // Validate login
      if (!formData.email.trim()) {
        setError('Please enter your email address to log in.');
        return;
      }
      if (!formData.password) {
        setError('Please enter your account password.');
        return;
      }

      setLoading(true);
      const res = await login(formData.email, formData.password);
      setLoading(false);
      if (res && !res.success) {
        setError(res.error || 'Invalid email or password.');
      }
    }
  };

  const currentBrandPreset = EV_PRESETS.find(p => p.brand === formData.carBrand);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Warm Orange-Yellow Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] bg-brand-500/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-electric-yellow/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-brand-900/20 via-orange-950/20 to-yellow-900/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Startup Branding Header with Official e-charge Logo */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-brand-500/30 text-brand-300 mb-4 shadow-lg shadow-brand-950/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Smart EV Slot Booking Platform</span>
          </div>

          {/* User's Custom Logo Display */}
          <div className="flex flex-col items-center justify-center">
            <div className="p-3.5 bg-white/95 rounded-3xl shadow-2xl shadow-brand-500/25 border-2 border-brand-400/40 inline-block mb-3 hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="e-charge Logo"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-amber-200/80 text-sm sm:text-base max-w-md mx-auto">
              Book high-speed charging bays in advance based on your vehicle's remaining range. Zero waiting. Guaranteed bay.
            </p>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-brand-500/30 backdrop-blur-2xl bg-dark-card/90">
          
          {/* Auth Tab Switcher */}
          <div className="flex bg-stone-950/80 p-1.5 rounded-2xl mb-8 border border-stone-800">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setError(''); }}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200 ${
                !isSignUp
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-stone-950 shadow-lg shadow-brand-500/30'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setError(''); }}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200 ${
                isSignUp
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-stone-950 shadow-lg shadow-brand-500/30'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              Sign Up (Register EV)
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isSignUp ? (
              /* LOGIN FORM */
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/60" />
                    <input
                      type="email"
                      required
                      placeholder="driver@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-stone-950/90 border border-stone-700/80 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90">
                      Password
                    </label>
                    <span className="text-xs text-brand-400 hover:underline cursor-pointer">Forgot password?</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/60" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-stone-950/90 border border-stone-700/80 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm transition"
                    />
                  </div>
                </div>

                {/* Login Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 text-base transition-all transform active:scale-[0.99] disabled:opacity-50"
                >
                  <span>{loading ? 'Authenticating...' : 'Enter e-charge Network'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Hyperlink under login button for users who don't have an account */}
                <div className="text-center pt-3">
                  <p className="text-xs text-stone-400">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsSignUp(true); setError(''); }}
                      className="text-amber-400 font-bold hover:text-amber-300 underline underline-offset-4 decoration-brand-500/50 hover:decoration-brand-500 transition"
                    >
                      Sign Up here
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              /* SIGN UP FORM (Customer Info + Passwords + Car Model + Charger Type) */
              <div className="space-y-6">
                {/* Section 1: Customer Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-800">
                    <User className="w-4 h-4 text-brand-400" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">1. Customer Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                          type="email"
                          required
                          placeholder="rahul.sharma@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Mobile Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:border-brand-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Create Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                          type="password"
                          required
                          placeholder="Create password (min 6 chars)"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                          type="password"
                          required
                          placeholder="Re-enter your password to confirm"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-950/90 border rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none ${
                            formData.confirmPassword && formData.password !== formData.confirmPassword
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-stone-700 focus:border-brand-500'
                          }`}
                        />
                        {formData.confirmPassword && (
                          <span className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold ${
                            formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {formData.password === formData.confirmPassword ? '✓ Match' : '✗ Mismatch'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: EV Car Specifications & Charger Type */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-800">
                    <Car className="w-4 h-4 text-electric-yellow" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">2. Your Electric Vehicle & Charger Type</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Car Brand */}
                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Car Brand / Make</label>
                      <select
                        value={formData.carBrand}
                        onChange={(e) => handleBrandChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-none focus:border-brand-500 font-semibold"
                      >
                        {EV_PRESETS.map(p => (
                          <option key={p.brand} value={p.brand} className="bg-stone-900 text-white">
                            {p.brand}
                          </option>
                        ))}
                        <option value="Other" className="bg-stone-900 text-white">Other / Custom Make</option>
                      </select>
                    </div>

                    {/* Car Model */}
                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Car Model</label>
                      {currentBrandPreset ? (
                        <select
                          value={formData.carModel}
                          onChange={(e) => handleModelChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-none focus:border-brand-500 font-medium"
                        >
                          {currentBrandPreset.models.map(m => (
                            <option key={m.name} value={m.name} className="bg-stone-900 text-white">
                              {m.name} ({m.capacity} kWh)
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          required
                          placeholder="e.g. Nexon.ev, Punch.ev, Curvv.ev, XUV400"
                          value={formData.carModel}
                          onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-none focus:border-brand-500"
                        />
                      )}
                    </div>

                    {/* Charger Type */}
                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Charger Type / Connector</label>
                      <select
                        value={formData.connectorType}
                        onChange={(e) => setFormData({ ...formData, connectorType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-none focus:border-brand-500 font-medium"
                      >
                        {CONNECTOR_TYPES.map(c => (
                          <option key={c} value={c} className="bg-stone-900 text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Battery Capacity */}
                    <div>
                      <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Battery Capacity (kWh)</label>
                      <div className="relative">
                        <Gauge className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                          type="number"
                          step="0.1"
                          min="10"
                          max="250"
                          required
                          placeholder="e.g. 45"
                          value={formData.batteryCapacity}
                          onChange={(e) => setFormData({ ...formData, batteryCapacity: e.target.value })}
                          className="w-full pl-10 pr-12 py-2.5 bg-stone-950/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-none focus:border-brand-500 font-mono"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                          kWh
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sign Up Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 text-base transition-all transform active:scale-[0.99] disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{loading ? 'Registering...' : 'Create Account & Start Booking'}</span>
                </button>

                {/* Hyperlink under signup button for users who already have an account */}
                <div className="text-center pt-2">
                  <p className="text-xs text-stone-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsSignUp(false); setError(''); }}
                      className="text-amber-400 font-bold hover:text-amber-300 underline underline-offset-4 decoration-brand-500/50 hover:decoration-brand-500 transition"
                    >
                      Log In here
                    </button>
                  </p>
                </div>
              </div>
            )}
          </form>

        </div>

        {/* Feature Pills Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-brand-500/20">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Range-Aware Filter</h4>
              <p className="text-xs text-stone-400 mt-0.5">Calculates stations within reachable distance</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-brand-500/20">
            <div className="w-10 h-10 rounded-xl bg-electric-yellow/10 border border-electric-yellow/30 flex items-center justify-center text-electric-yellow shrink-0">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Speed Plan Selection</h4>
              <p className="text-xs text-stone-400 mt-0.5">Eco 22kW, Fast 60kW to HyperCharge 240kW</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-brand-500/20">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Guaranteed Slot Booking</h4>
              <p className="text-xs text-stone-400 mt-0.5">Reserved bay waiting for your arrival</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
