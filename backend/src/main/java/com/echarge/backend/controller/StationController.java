package com.echarge.backend.controller;

import com.echarge.backend.dto.ApiResponse;
import com.echarge.backend.model.ChargingPoint;
import com.echarge.backend.model.ChargingStation;
import com.echarge.backend.service.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "*")
public class StationController {

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ChargingStation>>> getAllStations() {
        List<ChargingStation> stations = stationService.getAllStations();
        return ResponseEntity.ok(ApiResponse.ok("Retrieved " + stations.size() + " stations", stations));
    }

    @GetMapping("/reachable")
    public ResponseEntity<ApiResponse<List<ChargingStation>>> getReachableStations(
            @RequestParam(required = false, defaultValue = "100.0") Double rangeKm,
            @RequestParam(required = false) String chargerType,
            @RequestParam(required = false) String search) {
        List<ChargingStation> reachable = stationService.getReachableStations(rangeKm, chargerType, search);
        return ResponseEntity.ok(ApiResponse.ok(
                "Found " + reachable.size() + " reachable stations within " + rangeKm + " km range",
                reachable
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChargingStation>> getStationById(@PathVariable Long id) {
        Optional<ChargingStation> station = stationService.getStationById(id);
        return station.map(s -> ResponseEntity.ok(ApiResponse.ok(s)))
                .orElseGet(() -> ResponseEntity.badRequest().body(ApiResponse.error("Charging station not found")));
    }

    @GetMapping("/{id}/points")
    public ResponseEntity<ApiResponse<List<ChargingPoint>>> getStationPoints(@PathVariable Long id) {
        List<ChargingPoint> points = stationService.getChargingPointsForStation(id);
        return ResponseEntity.ok(ApiResponse.ok(points));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ChargingStation>>> searchStations(@RequestParam String q) {
        List<ChargingStation> stations = stationService.searchStations(q);
        return ResponseEntity.ok(ApiResponse.ok(stations));
    }
}
