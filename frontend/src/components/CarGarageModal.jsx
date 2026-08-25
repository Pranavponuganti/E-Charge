import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EV_PRESETS, CONNECTOR_TYPES } from '../data/mockData';
import { Car, Gauge, CheckCircle2, X, AlertCircle, ArrowLeft } from 'lucide-react';

export default function CarGarageModal({ isOpen, onClose }) {
  const { user, updateCar } = useAuth();

  const [carBrand, setCarBrand] = useState(user?.car?.brand || 'Tesla');
  const [carModel, setCarModel] = useState(user?.car?.model || 'Model 3 Long Range');
  const [connectorType, setConnectorType] = useState(user?.car?.connector || 'Tesla / NACS');
  const [batteryCapacity, setBatteryCapacity] = useState(user?.car?.capacity?.toString() || '75');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleBrandChange = (brand) => {
    setCarBrand(brand);
    const preset = EV_PRESETS.find(p => p.brand === brand);
    if (preset && preset.models.length > 0) {
      const defaultModel = preset.models[0];
      setCarModel(defaultModel.name);
      setConnectorType(defaultModel.connector);
      setBatteryCapacity(defaultModel.capacity.toString());
    }
  };

  const handleModelChange = (modelName) => {
    setCarModel(modelName);
    const preset = EV_PRESETS.find(p => p.brand === carBrand);
    const modelObj = preset?.models.find(m => m.name === modelName);
    if (modelObj) {
      setConnectorType(modelObj.connector);
      setBatteryCapacity(modelObj.capacity.toString());
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateCar({
      brand: carBrand,
      model: carModel,
      connector: connectorType,
      capacity: Number(batteryCapacity) || 60
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const currentBrandPreset = EV_PRESETS.find(p => p.brand === carBrand);

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
            <Car className="w-3.5 h-3.5" />
            <span>EV Garage & Vehicle Specs</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Manage Your Vehicle</h2>
          <p className="text-xs text-stone-400 mt-0.5">Configure your EV brand, plug type, and battery capacity for accurate charge timings.</p>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Vehicle specifications updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Car Brand / Make</label>
            <select
              value={carBrand}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-brand-500"
            >
              {EV_PRESETS.map(p => (
                <option key={p.brand} value={p.brand} className="bg-stone-900 text-white">
                  {p.brand}
                </option>
              ))}
              <option value="Other" className="bg-stone-900 text-white">Other / Custom Make</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Model</label>
            {currentBrandPreset ? (
              <select
                value={carModel}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-brand-500"
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
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-brand-500"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Connector Type</label>
              <select
                value={connectorType}
                onChange={(e) => setConnectorType(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-brand-500 font-mono"
              >
                {CONNECTOR_TYPES.map(c => (
                  <option key={c} value={c} className="bg-stone-900 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">Battery Capacity (kWh)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="10"
                  max="250"
                  required
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-brand-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                  kWh
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 text-sm transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Vehicle Specifications</span>
          </button>
        </form>

      </div>
    </div>
  );
}
