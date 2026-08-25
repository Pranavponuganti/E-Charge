package com.echarge.backend.service;

import com.echarge.backend.model.ChargingPoint;
import com.echarge.backend.model.ChargingStation;
import com.echarge.backend.repository.ChargingPointRepository;
import com.echarge.backend.repository.ChargingStationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StationService {

    private final ChargingStationRepository stationRepository;
    private final ChargingPointRepository pointRepository;

    public StationService(ChargingStationRepository stationRepository, ChargingPointRepository pointRepository) {
        this.stationRepository = stationRepository;
        this.pointRepository = pointRepository;
    }

    public List<ChargingStation> getAllStations() {
        return stationRepository.findAll();
    }

    public Optional<ChargingStation> getStationById(Long id) {
        return stationRepository.findById(id);
    }

    /**
     * Filter charging stations strictly by vehicle remaining range and optional charger type
     */
    public List<ChargingStation> getReachableStations(Double remainingRangeKm, String chargerType, String searchQuery) {
        double maxRange = (remainingRangeKm != null && remainingRangeKm > 0) ? remainingRangeKm : 500.0;
        List<ChargingStation> stations = stationRepository.findByDistanceKmLessThanEqualOrderByDistanceKmAsc(maxRange);

        // Filter by charger type if provided
        if (chargerType != null && !chargerType.isBlank() && !"all".equalsIgnoreCase(chargerType)) {
            final String ct = chargerType.trim().toLowerCase();
            stations = stations.stream()
                    .filter(s -> s.getChargerTypes() != null && s.getChargerTypes().toLowerCase().contains(ct))
                    .collect(Collectors.toList());
        }

        // Filter by search query if provided
        if (searchQuery != null && !searchQuery.isBlank()) {
            final String q = searchQuery.trim().toLowerCase();
            stations = stations.stream()
                    .filter(s -> (s.getName() != null && s.getName().toLowerCase().contains(q)) ||
                                 (s.getAddress() != null && s.getAddress().toLowerCase().contains(q)) ||
                                 (s.getOperator() != null && s.getOperator().toLowerCase().contains(q)))
                    .collect(Collectors.toList());
        }

        return stations;
    }

    public List<ChargingPoint> getChargingPointsForStation(Long stationId) {
        return pointRepository.findByStationId(stationId);
    }

    public List<ChargingStation> searchStations(String query) {
        if (query == null || query.isBlank()) {
            return stationRepository.findAll();
        }
        return stationRepository.searchStations(query.trim());
    }
}
