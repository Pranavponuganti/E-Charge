package com.echarge.backend.config;

import com.echarge.backend.model.ChargingPoint;
import com.echarge.backend.model.ChargingStation;
import com.echarge.backend.model.User;
import com.echarge.backend.repository.ChargingPointRepository;
import com.echarge.backend.repository.ChargingStationRepository;
import com.echarge.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ChargingStationRepository stationRepository;
    private final ChargingPointRepository pointRepository;

    public DataInitializer(UserRepository userRepository,
                           ChargingStationRepository stationRepository,
                           ChargingPointRepository pointRepository) {
        this.userRepository = userRepository;
        this.stationRepository = stationRepository;
        this.pointRepository = pointRepository;
    }

    @Override
    public void run(String... args) {
        // 1. Seed Demo Drivers
        if (userRepository.count() == 0) {
            userRepository.save(new User(
                    "Rahul Sharma",
                    "rahul.sharma@gmail.com",
                    "password123",
                    "+91 98765 43210",
                    "Tata",
                    "Nexon.ev Long Range",
                    "CCS2",
                    45.0
            ));

            userRepository.save(new User(
                    "Priya Patel",
                    "priya.patel@gmail.com",
                    "password123",
                    "+91 98234 56789",
                    "Mahindra",
                    "XUV400 Pro",
                    "CCS2",
                    39.4
            ));

            userRepository.save(new User(
                    "Ananya Reddy",
                    "ananya.reddy@gmail.com",
                    "password123",
                    "+91 99887 76655",
                    "MG",
                    "ZS EV Exclusive",
                    "CCS2",
                    50.3
            ));
        }

        // 2. Seed Charging Stations in Indian Cities & Highways
        if (stationRepository.count() == 0) {
            List<ChargingStation> stations = Arrays.asList(
                    new ChargingStation(
                            "Tata Power EZ Charge SuperHub – Hitec City",
                            "Cyber Towers Junction, Mindspace IT Park, Hitec City, Hyderabad",
                            17.4435, 78.3772, 4.5,
                            10, 6,
                            "CCS2, Type 2, Tesla / NACS", 240,
                            18.5, 4.9, "Tata Power EZ Charge",
                            "Food Court, Starbucks Café, Clean Restrooms, 24/7 Security, EV Lounge",
                            "AVAILABLE", 48.0, 42.0
                    ),
                    new ChargingStation(
                            "Jio-bp pulse Express Hub – Outer Ring Road",
                            "Exit 17, Gachibowli Financial District ORR, Hyderabad",
                            17.4200, 78.3400, 8.2,
                            8, 4,
                            "CCS2, CHAdeMO, Type 2", 150,
                            19.0, 4.8, "Jio-bp pulse",
                            "Wild Bean Cafe, Convenience Store, Restrooms, Free Tyre Air",
                            "AVAILABLE", 32.0, 30.0
                    ),
                    new ChargingStation(
                            "Statiq EV Fast Bay – Rajiv Gandhi Airport Expressway",
                            "Airport Approach Road, Shamshabad, Hyderabad",
                            17.2403, 78.4294, 18.4,
                            14, 9,
                            "CCS2, Tesla / NACS, Type 2, GB/T", 240,
                            20.0, 4.95, "Statiq Ultra",
                            "Airport Lounge, McDonald's Diner, Restrooms, Luggage Assistance",
                            "AVAILABLE", 68.0, 28.0
                    ),
                    new ChargingStation(
                            "Zeon Charging Fast Corridor – NH 44 Highway",
                            "Highway Mile 34, Medchal-Nagpur Highway (NH 44)",
                            17.6200, 78.4800, 32.0,
                            6, 3,
                            "CCS2, Type 2", 120,
                            18.0, 4.75, "Zeon Charging",
                            "Highway Food Plaza, Udupi Restaurant, Restrooms, Children Play Area",
                            "AVAILABLE", 75.0, 65.0
                    ),
                    new ChargingStation(
                            "ChargeZone Ultra Point – Inorbit Mall EV Hub",
                            "Lower Ground Parking, Inorbit Mall, Madhapur, Hyderabad",
                            17.4350, 78.3880, 6.8,
                            8, 5,
                            "CCS2, Type 2", 120,
                            17.5, 4.85, "ChargeZone",
                            "Shopping Mall, PVR Cinemas, Food Court, Covered Valet Parking",
                            "AVAILABLE", 22.0, 72.0
                    ),
                    new ChargingStation(
                            "Kazam EV Fast Oasis – Vijayawada Highway Junction",
                            "Hayathnagar Toll Plaza, NH 65, Hyderabad",
                            17.3200, 78.6000, 48.0,
                            6, 4,
                            "CCS2, Type 2", 60,
                            16.0, 4.7, "Kazam EV",
                            "Dhaba Dining, Restrooms, Tea Point, CCTV Security",
                            "AVAILABLE", 88.0, 48.0
                    ),
                    new ChargingStation(
                            "Shell Recharge Supercharger – Bangalore Highway (NH 44)",
                            "Jadcherla Expressway Food Plaza, NH 44",
                            16.7600, 78.1400, 78.0,
                            8, 5,
                            "CCS2, Type 2, Tesla / NACS", 150,
                            19.5, 4.9, "Shell Recharge",
                            "Shell Select Store, Costa Coffee, Clean Restrooms, ATM",
                            "AVAILABLE", 14.0, 20.0
                    ),
                    new ChargingStation(
                            "Ather & Tata Power Fast Grid – Warangal Highway Hub",
                            "Bhuvanagiri Bypass, NH 163 Highway",
                            17.5100, 78.8900, 110.0,
                            10, 7,
                            "CCS2, Type 2, CHAdeMO", 150,
                            18.0, 4.8, "Tata Power & Partners",
                            "Highway Motel, South Indian Tiffin, Restrooms, Garden Seating",
                            "AVAILABLE", 85.0, 15.0
                    )
            );

            List<ChargingStation> savedStations = stationRepository.saveAll(stations);

            // 3. Seed Charging Points for each station
            for (ChargingStation station : savedStations) {
                for (int bay = 1; bay <= station.getTotalPoints(); bay++) {
                    String connector = (bay % 3 == 1) ? "CCS2" : (bay % 3 == 2) ? "Type 2" : "Tesla / NACS";
                    String status = (bay <= station.getAvailablePoints()) ? "AVAILABLE" : "OCCUPIED";
                    pointRepository.save(new ChargingPoint(
                            station.getId(),
                            bay,
                            connector,
                            station.getSpeedKw(),
                            status
                    ));
                }
            }
        }
    }
}
