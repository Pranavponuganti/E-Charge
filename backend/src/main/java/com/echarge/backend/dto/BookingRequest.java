package com.echarge.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BookingRequest {

    private Long userId;
    private String userName;
    private String userEmail;

    @NotNull(message = "Station ID is required")
    private Long stationId;

    @NotBlank(message = "Station Name is required")
    private String stationName;

    private String stationAddress;

    private Integer bayNumber;

    @NotBlank(message = "Booking date is required")
    private String date;

    @NotBlank(message = "Time slot is required")
    private String timeSlot;

    private String connectorType;
    private String powerKw;
    private String targetCharge;
    private String kwhEstimate;
    private Integer chargeDurationMins;
    private Double totalCost;
    private String carSnapshot;

    public BookingRequest() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public Long getStationId() { return stationId; }
    public void setStationId(Long stationId) { this.stationId = stationId; }

    public String getStationName() { return stationName; }
    public void setStationName(String stationName) { this.stationName = stationName; }

    public String getStationAddress() { return stationAddress; }
    public void setStationAddress(String stationAddress) { this.stationAddress = stationAddress; }

    public Integer getBayNumber() { return bayNumber; }
    public void setBayNumber(Integer bayNumber) { this.bayNumber = bayNumber; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getConnectorType() { return connectorType; }
    public void setConnectorType(String connectorType) { this.connectorType = connectorType; }

    public String getPowerKw() { return powerKw; }
    public void setPowerKw(String powerKw) { this.powerKw = powerKw; }

    public String getTargetCharge() { return targetCharge; }
    public void setTargetCharge(String targetCharge) { this.targetCharge = targetCharge; }

    public String getKwhEstimate() { return kwhEstimate; }
    public void setKwhEstimate(String kwhEstimate) { this.kwhEstimate = kwhEstimate; }

    public Integer getChargeDurationMins() { return chargeDurationMins; }
    public void setChargeDurationMins(Integer chargeDurationMins) { this.chargeDurationMins = chargeDurationMins; }

    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }

    public String getCarSnapshot() { return carSnapshot; }
    public void setCarSnapshot(String carSnapshot) { this.carSnapshot = carSnapshot; }
}
