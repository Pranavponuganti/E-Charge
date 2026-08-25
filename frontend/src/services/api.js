/**
 * E-CHARGE Backend API Service Client
 * Connects to Spring Boot REST Backend (configurable via VITE_API_BASE_URL)
 * Features automatic fallback for seamless local/offline preview!
 */

// Only attempt backend calls if on localhost or if VITE_API_BASE_URL is explicitly set
const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isLocal ? 'http://localhost:8085/api' : null);

async function fetchJson(endpoint, options = {}) {
  if (!API_BASE_URL) {
    return null; // Silent fallback when deployed without a remote backend
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

export const authApi = {
  async signup(signupData) {
    const payload = {
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone,
      password: signupData.password,
      confirmPassword: signupData.confirmPassword,
      carBrand: signupData.carBrand,
      carModel: signupData.carModel,
      chargerType: signupData.connectorType,
      batteryCapacity: Number(signupData.batteryCapacity) || 60.0
    };

    const res = await fetchJson('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res && res.success) {
      return {
        success: true,
        user: {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          password: signupData.password,
          car: {
            brand: res.data.carBrand,
            model: res.data.carModel,
            connector: res.data.chargerType,
            capacity: res.data.batteryCapacity
          }
        }
      };
    }
    return null; // Return null to trigger smart local auth
  },

  async login(email, password) {
    const res = await fetchJson('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res && res.success) {
      return {
        success: true,
        user: {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          car: {
            brand: res.data.carBrand,
            model: res.data.carModel,
            connector: res.data.chargerType,
            capacity: res.data.batteryCapacity
          }
        }
      };
    }
    return null; // Return null to trigger smart local auth
  }
};

export const stationApi = {
  async getReachable(rangeKm, connector = null, speed = null) {
    let url = `/stations/reachable?rangeKm=${rangeKm}`;
    if (connector) url += `&connector=${encodeURIComponent(connector)}`;
    if (speed) url += `&speed=${encodeURIComponent(speed)}`;

    const res = await fetchJson(url);
    if (res && res.success) {
      return res.data;
    }
    return null;
  },

  async getAll() {
    const res = await fetchJson('/stations');
    if (res && res.success) {
      return res.data;
    }
    return null;
  },

  async getPoints(stationId) {
    const res = await fetchJson(`/stations/${stationId}/points`);
    if (res && res.success) {
      return res.data;
    }
    return null;
  }
};

export const bookingApi = {
  async create(bookingPayload) {
    const res = await fetchJson('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingPayload),
    });

    if (res && res.success) {
      return { success: true, booking: res.data };
    }
    return null;
  },

  async getByEmail(email) {
    const res = await fetchJson(`/bookings/email?email=${encodeURIComponent(email)}`);
    if (res && res.success) {
      return res.data;
    }
    return [];
  },

  async cancel(bookingId) {
    const res = await fetchJson(`/bookings/${bookingId}/cancel`, {
      method: 'PUT',
    });
    return res && res.success;
  }
};
