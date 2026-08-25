package com.echarge.backend.repository;

import com.echarge.backend.model.ChargingPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChargingPointRepository extends JpaRepository<ChargingPoint, Long> {
    List<ChargingPoint> findByStationId(Long stationId);
    List<ChargingPoint> findByStationIdAndStatus(Long stationId, String status);
}
