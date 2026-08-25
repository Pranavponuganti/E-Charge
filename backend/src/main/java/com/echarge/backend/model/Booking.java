package com.echarge.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String bookingReference; // e.g. "BK-829143"

    private Long userId;

    private String userName;

    private String userEmail;

    private Long stationId;

    private String stationName;

    private String stationAddress;

    private Integer bayNumber;

    private String date; // e.g. "Today, Aug 25"

    private String timeSlot; // e.g. "11:00 AM - 11:30 AM"

    private String connectorType;

    private String powerKw;

    private String targetCharge; // e.g. "80%"

    private String kwhEstimate;

    private Integer chargeDurationMins;

    private Double totalCost;

    private String carSnapshot; // e.g. "Tesla Model 3 Long Range"

    private String status; // "CONFIRMED", "COMPLETED", "CANCELLED"

    private LocalDateTime createdAt = LocalDateTime.now();

    public Booking() {}

    public Booking(String bookingReference, Long userId, String userName, String userEmail, Long stationId,
                   String stationName, String stationAddress, Integer bayNumber, String date, String timeSlot,
                   String connectorType, String powerKw, String targetCharge, String kwhEstimate,
                   Integer chargeDurationMins, Double totalCost, String carSnapshot, String status) {
        this.bookingReference = bookingReference;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.stationId = stationId;
        this.stationName = stationName;
        this.stationAddress = stationAddress;
        this.bayNumber = bayNumber;
        this.date = date;
        this.timeSlot = timeSlot;
        this.connectorType = connectorType;
        this.powerKw = powerKw;
        this.targetCharge = targetCharge;
        this.kwhEstimate = kwhEstimate;
        this.chargeDurationMins = chargeDurationMins;
        this.totalCost = totalCost;
        this.carSnapshot = carSnapshot;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

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

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
