package com.echarge.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "charging_stations")
public class ChargingStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String address;

    private Double latitude;

    private Double longitude;

    private Double distanceKm;

    private Integer totalPoints;

    private Integer availablePoints;

    private String chargerTypes; // e.g. "CCS2, Type 2, CHAdeMO, Tesla Supercharger"

    private Integer speedKw; // e.g. 150 kW

    private Double pricePerKwh; // e.g. $0.35 / ₹18.5

    private Double rating;

    private String operator;

    private String amenities;

    private String status; // "AVAILABLE", "BUSY", "MAINTENANCE"

    private Double mapCoordX; // percentage for visual radar
    private Double mapCoordY;

    public ChargingStation() {}

    public ChargingStation(String name, String address, Double latitude, Double longitude, Double distanceKm,
                           Integer totalPoints, Integer availablePoints, String chargerTypes, Integer speedKw,
                           Double pricePerKwh, Double rating, String operator, String amenities, String status,
                           Double mapCoordX, Double mapCoordY) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distanceKm = distanceKm;
        this.totalPoints = totalPoints;
        this.availablePoints = availablePoints;
        this.chargerTypes = chargerTypes;
        this.speedKw = speedKw;
        this.pricePerKwh = pricePerKwh;
        this.rating = rating;
        this.operator = operator;
        this.amenities = amenities;
        this.status = status;
        this.mapCoordX = mapCoordX;
        this.mapCoordY = mapCoordY;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public Integer getTotalPoints() { return totalPoints; }
    public void setTotalPoints(Integer totalPoints) { this.totalPoints = totalPoints; }

    public Integer getAvailablePoints() { return availablePoints; }
    public void setAvailablePoints(Integer availablePoints) { this.availablePoints = availablePoints; }

    public String getChargerTypes() { return chargerTypes; }
    public void setChargerTypes(String chargerTypes) { this.chargerTypes = chargerTypes; }

    public Integer getSpeedKw() { return speedKw; }
    public void setSpeedKw(Integer speedKw) { this.speedKw = speedKw; }

    public Double getPricePerKwh() { return pricePerKwh; }
    public void setPricePerKwh(Double pricePerKwh) { this.pricePerKwh = pricePerKwh; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getMapCoordX() { return mapCoordX; }
    public void setMapCoordX(Double mapCoordX) { this.mapCoordX = mapCoordX; }

    public Double getMapCoordY() { return mapCoordY; }
    public void setMapCoordY(Double mapCoordY) { this.mapCoordY = mapCoordY; }
}
