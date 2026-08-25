package com.echarge.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "charging_points")
public class ChargingPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long stationId;

    private Integer bayNumber;

    private String connectorType; // "CCS2", "Type 2", "CHAdeMO", "Tesla NACS"

    private Integer maxPowerKw;

    private String status; // "AVAILABLE", "OCCUPIED", "RESERVED"

    public ChargingPoint() {}

    public ChargingPoint(Long stationId, Integer bayNumber, String connectorType, Integer maxPowerKw, String status) {
        this.stationId = stationId;
        this.bayNumber = bayNumber;
        this.connectorType = connectorType;
        this.maxPowerKw = maxPowerKw;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStationId() { return stationId; }
    public void setStationId(Long stationId) { this.stationId = stationId; }

    public Integer getBayNumber() { return bayNumber; }
    public void setBayNumber(Integer bayNumber) { this.bayNumber = bayNumber; }

    public String getConnectorType() { return connectorType; }
    public void setConnectorType(String connectorType) { this.connectorType = connectorType; }

    public Integer getMaxPowerKw() { return maxPowerKw; }
    public void setMaxPowerKw(Integer maxPowerKw) { this.maxPowerKw = maxPowerKw; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
