/**
 * E-CHARGE Backend API Service Client
 * Connects to Spring Boot REST Backend at http://localhost:8085/api
 * Features automatic fallback for seamless local/offline preview!
 */

const API_BASE_URL = 'http://localhost:8085/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`[Backend API] Request to ${endpoint} failed or backend offline. Using fallback:`, err.message);
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
      return { success: true, user: res.data, message: res.message };
    }
    if (res && !res.success) {
      return { success: false, error: res.message };
    }

    // Fallback: Local response if backend server is not running
    return {
      success: true,
      user: {
        id: 'local-' + Date.now(),
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        car: {
          brand: signupData.carBrand,
          model: signupData.carModel,
          connector: signupData.connectorType,
          capacity: Number(signupData.batteryCapacity) || 60
        }
      },
      message: 'Account created locally'
    };
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
    if (res && !res.success) {
      return { success: false, error: res.message };
    }

    return null; // Fall back to local authentication
  }
};

export const stationApi = {
  async getReachable(rangeKm, chargerType, search) {
    let url = `/stations/reachable?rangeKm=${rangeKm || 100}`;
    if (chargerType && chargerType !== 'all') url += `&chargerType=${encodeURIComponent(chargerType)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetchJson(url);
    if (res && res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return null;
  },

  async getAll() {
    const res = await fetchJson('/stations');
    if (res && res.success && Array.isArray(res.data)) {
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
    return null;
  },

  async cancel(bookingId) {
    const res = await fetchJson(`/bookings/${bookingId}/cancel`, {
      method: 'PUT'
    });
    if (res && res.success) {
      return res.data;
    }
    return null;
  }
};
