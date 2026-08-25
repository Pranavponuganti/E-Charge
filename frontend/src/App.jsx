import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MOCK_STATIONS } from './data/mockData';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import RangeSearchBar from './components/RangeSearchBar';
import InteractiveMap from './components/InteractiveMap';
import StationList from './components/StationList';
import BookingModal from './components/BookingModal';
import BookingPassModal from './components/BookingPassModal';
import MyBookings from './components/MyBookings';
import CarGarageModal from './components/CarGarageModal';
import TariffModal from './components/TariffModal';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import { Zap, Sparkles, Shield, BatteryCharging, CheckCircle2, ChevronRight, Info } from 'lucide-react';

function Dashboard() {
  const { user, remainingRange, bookings } = useAuth();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeedPlan, setSelectedSpeedPlan] = useState('all');
  const [matchConnectorOnly, setMatchConnectorOnly] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'list' | 'map'

  // Modal States
  const [selectedStation, setSelectedStation] = useState(null);
  const [bookingStation, setBookingStation] = useState(null);
  const [activePassBooking, setActivePassBooking] = useState(null);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [isTariffOpen, setIsTariffOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Filter Stations strictly by entered remainingRange and other criteria
  const reachableStations = useMemo(() => {
    return MOCK_STATIONS.filter((station) => {
      // 1. Primary filter: MUST be within the car's current remaining range
      if (station.distanceKm > remainingRange) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = station.name.toLowerCase().includes(q);
        const matchesAddress = station.address.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress) return false;
      }

      // 3. Speed plan filter
      if (selectedSpeedPlan !== 'all') {
        if (!station.supportedPlans.includes(selectedSpeedPlan)) return false;
      }

      // 4. Connector matching filter
      if (matchConnectorOnly && user?.car?.connector) {
        const userConn = user.car.connector.toLowerCase();
        const hasMatch = station.connectors.some(c =>
          c.toLowerCase().includes(userConn) || userConn.includes(c.toLowerCase())
        );
        if (!hasMatch) return false;
      }

      return true;
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [remainingRange, searchQuery, selectedSpeedPlan, matchConnectorOnly, user]);

  const handleOpenBooking = (station) => {
    setBookingStation(station);
  };

  const handleBookingSuccess = (newBooking) => {
    setBookingStation(null);
    setActivePassBooking(newBooking);
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-base text-amber-50 selection:bg-brand-500 selection:text-stone-950">
      {/* Background Ambient Glows in Amber/Orange/Yellow */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-yellow/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Navigation */}
      <Navbar
        onOpenGarage={() => setIsGarageOpen(true)}
        onOpenBookings={() => setIsBookingsOpen(true)}
        onOpenTariff={() => setIsTariffOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Active Booking Banner Alert (if user has active bookings) */}
        {bookings.length > 0 && bookings[0].status === 'CONFIRMED' && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-900 to-stone-900 border border-brand-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Active Reserved Bay: {bookings[0].stationName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/20 text-amber-300 font-bold">
                    Bay #{bookings[0].bayNumber}
                  </span>
                </span>
                <p className="text-[11px] text-amber-200/70 mt-0.5 font-mono">
                  {bookings[0].date} • {bookings[0].timeSlot} ({bookings[0].speedPlan})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActivePassBooking(bookings[0])}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs font-mono shadow-md shadow-brand-500/20 flex items-center gap-1.5 shrink-0 transition"
            >
              <span>View Digital Pass</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Range Controller & Search Filter */}
        <RangeSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpeedPlan={selectedSpeedPlan}
          setSelectedSpeedPlan={setSelectedSpeedPlan}
          matchConnectorOnly={matchConnectorOnly}
          setMatchConnectorOnly={setMatchConnectorOnly}
          viewMode={viewMode}
          setViewMode={setViewMode}
          reachableCount={reachableStations.length}
          totalCount={MOCK_STATIONS.length}
        />

        {/* Views Breakdown: Split / Cards / Map */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Col: Station Cards */}
            <div className="lg:col-span-7 space-y-4">
              <StationList
                stations={reachableStations}
                onSelectStation={setSelectedStation}
                onBookStation={handleOpenBooking}
              />
            </div>

            {/* Right Col: Sticky Radar Map */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <InteractiveMap
                stations={MOCK_STATIONS}
                selectedStation={selectedStation}
                onSelectStation={setSelectedStation}
                onBookStation={handleOpenBooking}
              />
            </div>
          </div>
        )}

        {viewMode === 'list' && (
          <StationList
            stations={reachableStations}
            onSelectStation={setSelectedStation}
            onBookStation={handleOpenBooking}
          />
        )}

        {viewMode === 'map' && (
          <div className="space-y-4">
            <InteractiveMap
              stations={MOCK_STATIONS}
              selectedStation={selectedStation}
              onSelectStation={setSelectedStation}
              onBookStation={handleOpenBooking}
            />
            <StationList
              stations={reachableStations}
              onSelectStation={setSelectedStation}
              onBookStation={handleOpenBooking}
            />
          </div>
        )}

      </main>

      {/* Footer with Contact Us */}
      <Footer
        onOpenGarage={() => setIsGarageOpen(true)}
        onOpenTariff={() => setIsTariffOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals */}
      <BookingModal
        station={bookingStation}
        isOpen={!!bookingStation}
        onClose={() => setBookingStation(null)}
        onBookingSuccess={handleBookingSuccess}
      />

      <BookingPassModal
        booking={activePassBooking}
        isOpen={!!activePassBooking}
        onClose={() => setActivePassBooking(null)}
        onViewAllBookings={() => {
          setActivePassBooking(null);
          setIsBookingsOpen(true);
        }}
      />

      <MyBookings
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        onViewPass={(b) => {
          setIsBookingsOpen(false);
          setActivePassBooking(b);
        }}
      />

      <CarGarageModal
        isOpen={isGarageOpen}
        onClose={() => setIsGarageOpen(false)}
      />

      <TariffModal
        isOpen={isTariffOpen}
        onClose={() => setIsTariffOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();

  // If no user is logged in, show the first-page e-charge branding + Login/Signup
  if (!user) {
    return <AuthModal />;
  }

  return <Dashboard />;
}
