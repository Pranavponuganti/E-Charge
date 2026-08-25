import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_STATIONS } from '../data/mockData';
import { authApi, bookingApi, stationApi } from '../services/api';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'echarge_user_session';
const STORAGE_KEY_ACCOUNTS = 'echarge_registered_accounts';
const STORAGE_KEY_RANGE = 'echarge_car_range';
const STORAGE_KEY_BOOKINGS = 'echarge_active_bookings';

export function AuthProvider({ children }) {
  // Registered Accounts in LocalStorage
  const getRegisteredAccounts = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const saveAccount = (account) => {
    try {
      const existing = getRegisteredAccounts();
      const filtered = existing.filter(a => a.email.toLowerCase() !== account.email.toLowerCase());
      const updated = [...filtered, account];
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save account to localStorage:', e);
    }
  };

  // User session state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Current remaining range in km
  const [remainingRange, setRemainingRange] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RANGE);
      return saved ? Number(saved) : 75; // Default 75 km
    } catch {
      return 75;
    }
  });

  // Active bookings list
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Stations from backend API (with fallback)
  const [stations, setStations] = useState(MOCK_STATIONS);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RANGE, remainingRange.toString());
  }, [remainingRange]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  // Load reachable stations from backend when range or user changes
  useEffect(() => {
    let isMounted = true;
    async function loadStations() {
      const backendStations = await stationApi.getReachable(remainingRange, null, null);
      if (isMounted && backendStations && backendStations.length > 0) {
        const formatted = backendStations.map(s => ({
          id: 'st-' + s.id,
          rawId: s.id,
          name: s.name,
          address: s.address,
          distanceKm: s.distanceKm,
          totalPoints: s.totalPoints,
          availablePoints: s.availablePoints,
          powerKw: s.speedKw,
          rating: s.rating,
          operator: s.operator,
          pricePerKwh: s.pricePerKwh,
          connectors: s.chargerTypes ? s.chargerTypes.split(',').map(c => c.trim()) : ['CCS2', 'Type 2'],
          supportedPlans: ['ultra', 'rapid', 'eco'],
          amenities: s.amenities ? s.amenities.split(',').map(a => a.trim()) : ['Restrooms', 'Cafe'],
          coordinates: { x: s.mapCoordX || 50, y: s.mapCoordY || 50 }
        }));
        setStations(formatted);
      }
    }
    loadStations();
    return () => { isMounted = false; };
  }, [remainingRange, user]);

  // Login handler
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Backend API first
    const apiRes = await authApi.login(cleanEmail, password);
    if (apiRes && apiRes.success) {
      setUser(apiRes.user);
      saveAccount(apiRes.user);
      return { success: true };
    }

    // 2. Check LocalStorage registered accounts DB
    const accounts = getRegisteredAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (existing) {
      if (existing.password && existing.password !== password) {
        return { success: false, error: 'Incorrect password. Please verify and try again.' };
      }
      setUser(existing);
      return { success: true };
    }

    // 3. If account not found in local DB, create a session user with defaults
    const autoUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: cleanEmail,
      phone: '+91 98765 43210',
      password,
      car: {
        brand: 'Tata',
        model: 'Nexon.ev Long Range',
        connector: 'CCS2',
        capacity: 45
      }
    };
    saveAccount(autoUser);
    setUser(autoUser);
    return { success: true };
  };

  // Sign up handler
  const signup = async (signupData) => {
    const cleanEmail = signupData.email.trim().toLowerCase();

    // 1. Try Backend API first
    const apiRes = await authApi.signup(signupData);
    if (apiRes && apiRes.success) {
      setUser(apiRes.user);
      saveAccount(apiRes.user);
      return { success: true };
    }

    // 2. Create Local Account
    const newUser = {
      id: 'usr-' + Date.now(),
      name: signupData.name || 'EV Driver',
      email: cleanEmail,
      phone: signupData.phone || '+91 98765 43210',
      password: signupData.password,
      car: {
        brand: signupData.carBrand || 'Tata',
        model: signupData.carModel || 'Nexon.ev Long Range',
        connector: signupData.connectorType || 'CCS2',
        capacity: Number(signupData.batteryCapacity) || 45
      }
    };

    saveAccount(newUser);
    setUser(newUser);
    return { success: true };
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  // Update Car Specs in Garage
  const updateCar = (updatedCar) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      car: {
        ...user.car,
        ...updatedCar,
        capacity: Number(updatedCar.capacity) || user.car.capacity
      }
    };
    setUser(updatedUser);
    saveAccount(updatedUser);
  };

  // Add new booking
  const addBooking = async (bookingData) => {
    const payload = {
      userId: user?.id && typeof user.id === 'number' ? user.id : 1,
      userName: user?.name || 'EV Driver',
      userEmail: user?.email || 'driver@gmail.com',
      stationId: bookingData.stationRawId || 1,
      stationName: bookingData.stationName,
      stationAddress: bookingData.stationAddress,
      bayNumber: bookingData.bayNumber || Math.floor(1 + Math.random() * 6),
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      connectorType: bookingData.connectorType,
      powerKw: bookingData.powerKw,
      targetCharge: bookingData.targetCharge,
      kwhEstimate: bookingData.kwhEstimate,
      chargeDurationMins: bookingData.chargeDurationMins,
      totalCost: bookingData.totalCost,
      carSnapshot: bookingData.carSnapshot
    };

    let confirmedBooking = null;
    const apiRes = await bookingApi.create(payload);
    if (apiRes && apiRes.success) {
      confirmedBooking = {
        id: apiRes.booking.bookingReference,
        backendId: apiRes.booking.id,
        createdAt: apiRes.booking.createdAt,
        status: apiRes.booking.status,
        bayNumber: apiRes.booking.bayNumber,
        ...bookingData
      };
    } else {
      confirmedBooking = {
        id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
        status: 'CONFIRMED',
        bayNumber: Math.floor(1 + Math.random() * 8),
        ...bookingData
      };
    }

    setBookings(prev => [confirmedBooking, ...prev]);
    return confirmedBooking;
  };

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    const target = bookings.find(b => b.id === bookingId);
    if (target?.backendId) {
      await bookingApi.cancel(target.backendId);
    }
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  return (
    <AuthContext.Provider value={{
      user,
      remainingRange,
      setRemainingRange,
      stations,
      bookings,
      login,
      signup,
      logout,
      updateCar,
      addBooking,
      cancelBooking
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
