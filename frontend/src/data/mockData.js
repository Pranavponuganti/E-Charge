// Indian EV Car Models Database with Default Battery Capacities and Connectors
export const EV_PRESETS = [
  {
    brand: "Tata",
    models: [
      { name: "Nexon.ev Long Range", capacity: 45, connector: "CCS2" },
      { name: "Curvv.ev 55", capacity: 55, connector: "CCS2" },
      { name: "Punch.ev Long Range", capacity: 35, connector: "CCS2" },
      { name: "Tiago.ev", capacity: 24, connector: "CCS2" },
      { name: "Tigor.ev", capacity: 26, connector: "CCS2" }
    ]
  },
  {
    brand: "Mahindra",
    models: [
      { name: "XUV400 Pro", capacity: 39.4, connector: "CCS2" },
      { name: "BE 6e", capacity: 59, connector: "CCS2" },
      { name: "XEV 9e", capacity: 79, connector: "CCS2" }
    ]
  },
  {
    brand: "MG",
    models: [
      { name: "ZS EV Exclusive", capacity: 50.3, connector: "CCS2" },
      { name: "Windsor EV", capacity: 38, connector: "CCS2" },
      { name: "Comet EV", capacity: 17.3, connector: "Type 2 (AC)" },
      { name: "Cyberster", capacity: 77, connector: "CCS2" }
    ]
  },
  {
    brand: "Hyundai",
    models: [
      { name: "Ioniq 5 AWD", capacity: 77.4, connector: "CCS2" },
      { name: "Kona Electric", capacity: 64.8, connector: "CCS2" },
      { name: "Creta EV", capacity: 48, connector: "CCS2" }
    ]
  },
  {
    brand: "BYD",
    models: [
      { name: "Atto 3 Extended", capacity: 60.5, connector: "CCS2" },
      { name: "Seal AWD", capacity: 82.5, connector: "CCS2" },
      { name: "eMAX 7 MPV", capacity: 71.8, connector: "CCS2" },
      { name: "Dolphin", capacity: 44.9, connector: "CCS2" }
    ]
  },
  {
    brand: "Kia",
    models: [
      { name: "EV6 GT-Line", capacity: 77.4, connector: "CCS2" },
      { name: "EV9 AWD", capacity: 99.8, connector: "CCS2" }
    ]
  },
  {
    brand: "Citroën",
    models: [
      { name: "ë-C3 Live", capacity: 29.2, connector: "CCS2" }
    ]
  },
  {
    brand: "BMW",
    models: [
      { name: "i4 eDrive40", capacity: 83.9, connector: "CCS2" },
      { name: "iX1 xDrive30", capacity: 66.5, connector: "CCS2" },
      { name: "iX xDrive50", capacity: 111.5, connector: "CCS2" }
    ]
  },
  {
    brand: "Mercedes-Benz",
    models: [
      { name: "EQB 350", capacity: 66.5, connector: "CCS2" },
      { name: "EQE 350+", capacity: 90.6, connector: "CCS2" },
      { name: "EQS 580 4MATIC", capacity: 107.8, connector: "CCS2" }
    ]
  },
  {
    brand: "Tesla",
    models: [
      { name: "Model 3 Long Range", capacity: 75, connector: "Tesla / NACS" },
      { name: "Model Y Performance", capacity: 82, connector: "Tesla / NACS" }
    ]
  }
];

export const CONNECTOR_TYPES = [
  "CCS2",
  "Type 2 (AC)",
  "Tesla / NACS",
  "CHAdeMO",
  "GB/T"
];

// Speed Plans in INR (₹)
export const SPEED_PLANS = [
  {
    id: "eco",
    name: "Eco Charge AC",
    badge: "Gentle on Battery",
    power: "22 kW AC",
    ratePerKwh: 14.0,
    reservationFee: 30,
    typicalTime80: "~60-90 min",
    description: "Ideal for shopping malls, office complexes, or long breaks. Economical tariff.",
    color: "from-amber-600 to-yellow-600",
    borderGlow: "border-amber-500/40 hover:border-amber-400"
  },
  {
    id: "rapid",
    name: "Fast DC Rapid",
    badge: "Most Popular",
    power: "60 kW DC",
    ratePerKwh: 18.5,
    reservationFee: 50,
    typicalTime80: "~35-45 min",
    description: "Great for quick dining, roadside pitstops, and daily commuting refills.",
    color: "from-orange-500 to-amber-500",
    borderGlow: "border-orange-500/40 hover:border-orange-400"
  },
  {
    id: "ultra",
    name: "SuperFast DC",
    badge: "Express Highway Speed",
    power: "150 kW DC",
    ratePerKwh: 22.0,
    reservationFee: 75,
    typicalTime80: "~18-25 min",
    description: "Highway expressways (e.g. NH 44, Mumbai-Pune Exp). Rapid 15-20 min quick charge.",
    color: "from-orange-600 to-yellow-500",
    borderGlow: "border-orange-500/40 hover:border-orange-400"
  },
  {
    id: "hyper",
    name: "HyperCharge 240",
    badge: "Ultra-Fast Flagship",
    power: "240 kW DC",
    ratePerKwh: 26.0,
    reservationFee: 99,
    typicalTime80: "~12-15 min",
    description: "Dual-gun liquid-cooled dispensers for high-power 800V EV architectures.",
    color: "from-yellow-400 via-orange-500 to-amber-600",
    borderGlow: "border-yellow-500/40 hover:border-yellow-400"
  }
];

// Indian EV Charging Hubs
export const MOCK_STATIONS = [
  {
    id: "echg-101",
    name: "Tata Power EZ Charge SuperHub – Hitec City",
    address: "Cyber Towers Junction, Mindspace IT Park, Hitec City, Hyderabad",
    distanceKm: 4.5,
    rating: 4.9,
    reviewsCount: 420,
    baysTotal: 10,
    baysAvailable: 6,
    connectors: ["CCS2", "Type 2 (AC)", "Tesla / NACS"],
    supportedPlans: ["eco", "rapid", "ultra", "hyper"],
    maxPowerKw: 240,
    baseRate: 18.5,
    operator: "Tata Power EZ Charge",
    amenities: ["Food Court", "Starbucks Café", "Clean Restrooms", "24/7 Security", "EV Lounge"],
    status: "Open 24/7",
    isSolarPowered: true,
    coordinates: { x: 48, y: 42 },
    timeSlots: [
      { id: "s1", time: "10:00 AM - 10:30 AM", status: "available" },
      { id: "s2", time: "10:30 AM - 11:00 AM", status: "booked" },
      { id: "s3", time: "11:00 AM - 11:30 AM", status: "available" },
      { id: "s4", time: "11:30 AM - 12:00 PM", status: "available" },
      { id: "s5", time: "12:00 PM - 12:30 PM", status: "booked" },
      { id: "s6", time: "12:30 PM - 01:00 PM", status: "available" },
      { id: "s7", time: "01:00 PM - 01:30 PM", status: "available" },
      { id: "s8", time: "01:30 PM - 02:00 PM", status: "available" }
    ]
  },
  {
    id: "echg-102",
    name: "Jio-bp pulse Express Hub – Outer Ring Road",
    address: "Exit 17, Gachibowli Financial District ORR, Hyderabad",
    distanceKm: 8.2,
    rating: 4.8,
    reviewsCount: 310,
    baysTotal: 8,
    baysAvailable: 4,
    connectors: ["CCS2", "Type 2 (AC)", "CHAdeMO"],
    supportedPlans: ["eco", "rapid", "ultra"],
    maxPowerKw: 150,
    baseRate: 19.0,
    operator: "Jio-bp pulse",
    amenities: ["Wild Bean Cafe", "Convenience Store", "Restrooms", "Free Tyre Air"],
    status: "Open 24/7",
    isSolarPowered: true,
    coordinates: { x: 62, y: 35 },
    timeSlots: [
      { id: "s1", time: "10:00 AM - 10:30 AM", status: "available" },
      { id: "s2", time: "10:30 AM - 11:00 AM", status: "available" },
      { id: "s3", time: "11:00 AM - 11:30 AM", status: "booked" },
      { id: "s4", time: "11:30 AM - 12:00 PM", status: "available" }
    ]
  },
  {
    id: "echg-103",
    name: "Statiq EV Fast Bay – Rajiv Gandhi Int'l Airport Expressway",
    address: "Airport Approach Road, Shamshabad, Hyderabad",
    distanceKm: 18.4,
    rating: 4.95,
    reviewsCount: 580,
    baysTotal: 14,
    baysAvailable: 9,
    connectors: ["CCS2", "Tesla / NACS", "Type 2 (AC)", "GB/T"],
    supportedPlans: ["eco", "rapid", "ultra", "hyper"],
    maxPowerKw: 240,
    baseRate: 20.0,
    operator: "Statiq Ultra",
    amenities: ["Airport Lounge", "McDonald's Diner", "Restrooms", "Luggage Assistance"],
    status: "Open 24/7",
    isSolarPowered: true,
    coordinates: { x: 30, y: 28 },
    timeSlots: [
      { id: "s1", time: "10:00 AM - 10:30 AM", status: "available" },
      { id: "s2", time: "10:30 AM - 11:00 AM", status: "available" },
      { id: "s3", time: "11:00 AM - 11:30 AM", status: "available" },
      { id: "s4", time: "11:30 AM - 12:00 PM", status: "booked" }
    ]
  },
  {
    id: "echg-104",
    name: "Zeon Charging Fast Corridor – NH 44 Highway",
    address: "Highway Mile 34, Medchal-Nagpur Highway (NH 44)",
    distanceKm: 32.0,
    rating: 4.75,
    reviewsCount: 240,
    baysTotal: 6,
    baysAvailable: 3,
    connectors: ["CCS2", "Type 2 (AC)"],
    supportedPlans: ["eco", "rapid", "ultra"],
    maxPowerKw: 120,
    baseRate: 18.0,
    operator: "Zeon Charging",
    amenities: ["Highway Food Plaza", "Udupi Restaurant", "Restrooms", "Children Play Area"],
    status: "Open 24/7",
    isSolarPowered: false,
    coordinates: { x: 74, y: 64 },
    timeSlots: [
      { id: "s1", time: "10:00 AM - 10:30 AM", status: "available" },
      { id: "s2", time: "10:30 AM - 11:00 AM", status: "available" },
      { id: "s3", time: "11:00 AM - 11:30 AM", status: "available" }
    ]
  },
  {
    id: "echg-105",
    name: "ChargeZone Ultra Point – Inorbit Mall EV Hub",
    address: "Lower Ground Parking, Inorbit Mall, Madhapur, Hyderabad",
    distanceKm: 6.8,
    rating: 4.85,
    reviewsCount: 390,
    baysTotal: 8,
    baysAvailable: 5,
    connectors: ["CCS2", "Type 2 (AC)"],
    supportedPlans: ["eco", "rapid", "ultra"],
    maxPowerKw: 120,
    baseRate: 17.5,
    operator: "ChargeZone",
    amenities: ["Shopping Mall", "PVR Cinemas", "Food Court", "Covered Valet Parking"],
    status: "Open 24/7",
    isSolarPowered: false,
    coordinates: { x: 42, y: 55 },
    timeSlots: [
      { id: "s1", time: "11:00 AM - 11:30 AM", status: "available" },
      { id: "s2", time: "11:30 AM - 12:00 PM", status: "available" }
    ]
  },
  {
    id: "echg-106",
    name: "Kazam EV Fast Oasis – Vijayawada Highway Junction",
    address: "Hayathnagar Toll Plaza, NH 65, Hyderabad",
    distanceKm: 48.0,
    rating: 4.7,
    reviewsCount: 180,
    baysTotal: 6,
    baysAvailable: 4,
    connectors: ["CCS2", "Type 2 (AC)"],
    supportedPlans: ["eco", "rapid"],
    maxPowerKw: 60,
    baseRate: 16.0,
    operator: "Kazam EV",
    amenities: ["Dhaba Dining", "Restrooms", "Tea Point", "CCTV Security"],
    status: "Open 24/7",
    isSolarPowered: false,
    coordinates: { x: 82, y: 45 },
    timeSlots: [
      { id: "s1", time: "10:00 AM - 10:30 AM", status: "available" },
      { id: "s2", time: "10:30 AM - 11:00 AM", status: "available" }
    ]
  },
  {
    id: "echg-107",
    name: "Shell Recharge Supercharger – Bangalore Highway (NH 44)",
    address: "Jadcherla Expressway Food Plaza, NH 44",
    distanceKm: 78.0,
    rating: 4.9,
    reviewsCount: 460,
    baysTotal: 8,
    baysAvailable: 5,
    connectors: ["CCS2", "Tesla / NACS", "Type 2 (AC)"],
    supportedPlans: ["eco", "rapid", "ultra"],
    maxPowerKw: 150,
    baseRate: 19.5,
    operator: "Shell Recharge",
    amenities: ["Shell Select Store", "Costa Coffee", "Clean Restrooms", "ATM"],
    status: "Open 24/7",
    isSolarPowered: true,
    coordinates: { x: 22, y: 78 },
    timeSlots: [
      { id: "s1", time: "10:00 AM - 10:30 AM", status: "available" },
      { id: "s2", time: "10:30 AM - 11:00 AM", status: "available" }
    ]
  },
  {
    id: "echg-108",
    name: "Ather & Tata Power Fast Grid – Warangal Highway Hub",
    address: "Bhuvanagiri Bypass, NH 163 Highway",
    distanceKm: 110.0,
    rating: 4.8,
    reviewsCount: 220,
    baysTotal: 10,
    baysAvailable: 7,
    connectors: ["CCS2", "Type 2 (AC)", "CHAdeMO"],
    supportedPlans: ["eco", "rapid", "ultra"],
    maxPowerKw: 150,
    baseRate: 18.0,
    operator: "Tata Power & Partners",
    amenities: ["Highway Motel", "South Indian Tiffin", "Restrooms", "Garden Seating"],
    status: "Open 24/7",
    isSolarPowered: false,
    coordinates: { x: 88, y: 18 },
    timeSlots: [
      { id: "s1", time: "10:00 AM - 10:30 AM", status: "available" },
      { id: "s2", time: "10:30 AM - 11:00 AM", status: "available" }
    ]
  }
];
