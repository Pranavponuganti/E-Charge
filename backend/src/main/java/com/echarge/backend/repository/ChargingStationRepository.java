package com.echarge.backend.repository;

import com.echarge.backend.model.ChargingStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChargingStationRepository extends JpaRepository<ChargingStation, Long> {

    List<ChargingStation> findByDistanceKmLessThanEqualOrderByDistanceKmAsc(Double maxDistanceKm);

    @Query("SELECT s FROM ChargingStation s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.address) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.operator) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<ChargingStation> searchStations(@Param("query") String query);
}
