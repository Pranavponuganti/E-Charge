package com.echarge.backend.service;

import com.echarge.backend.dto.BookingRequest;
import com.echarge.backend.model.Booking;
import com.echarge.backend.model.ChargingStation;
import com.echarge.backend.repository.BookingRepository;
import com.echarge.backend.repository.ChargingStationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ChargingStationRepository stationRepository;
    private final Random random = new Random();

    public BookingService(BookingRepository bookingRepository, ChargingStationRepository stationRepository) {
        this.bookingRepository = bookingRepository;
        this.stationRepository = stationRepository;
    }

    @Transactional
    public Booking createBooking(BookingRequest request) {
        // Generate unique booking reference e.g. BK-482910
        String reference = "BK-" + (100000 + random.nextInt(900000));

        // Assign Bay Number if not specified
        int bayNumber = (request.getBayNumber() != null && request.getBayNumber() > 0)
                ? request.getBayNumber()
                : (1 + random.nextInt(6));

        // Optional double-booking conflict check
        boolean conflict = bookingRepository.existsByStationIdAndBayNumberAndDateAndTimeSlotAndStatus(
                request.getStationId(), bayNumber, request.getDate(), request.getTimeSlot(), "CONFIRMED"
        );
        if (conflict) {
            // Pick next available bay
            bayNumber = (bayNumber % 8) + 1;
        }

        // Adjust available points on station if possible
        Optional<ChargingStation> stationOpt = stationRepository.findById(request.getStationId());
        if (stationOpt.isPresent()) {
            ChargingStation station = stationOpt.get();
            if (station.getAvailablePoints() > 0) {
                station.setAvailablePoints(station.getAvailablePoints() - 1);
                stationRepository.save(station);
            }
        }

        Booking booking = new Booking(
                reference,
                request.getUserId() != null ? request.getUserId() : 1L,
                request.getUserName() != null ? request.getUserName() : "EV Driver",
                request.getUserEmail() != null ? request.getUserEmail() : "driver@echarge.com",
                request.getStationId(),
                request.getStationName(),
                request.getStationAddress(),
                bayNumber,
                request.getDate(),
                request.getTimeSlot(),
                request.getConnectorType() != null ? request.getConnectorType() : "CCS2",
                request.getPowerKw() != null ? request.getPowerKw() : "150 kW",
                request.getTargetCharge() != null ? request.getTargetCharge() : "80%",
                request.getKwhEstimate() != null ? request.getKwhEstimate() : "35.0",
                request.getChargeDurationMins() != null ? request.getChargeDurationMins() : 25,
                request.getTotalCost() != null ? request.getTotalCost() : 14.50,
                request.getCarSnapshot() != null ? request.getCarSnapshot() : "EV Vehicle",
                "CONFIRMED"
        );

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Booking> getUserBookingsByEmail(String email) {
        return bookingRepository.findByUserEmailOrderByCreatedAtDesc(email);
    }

    public Optional<Booking> getBookingByReference(String ref) {
        return bookingRepository.findByBookingReference(ref);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking cancelBooking(Long bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            throw new IllegalArgumentException("Booking not found with ID: " + bookingId);
        }
        Booking booking = bookingOpt.get();
        booking.setStatus("CANCELLED");

        // Restore available point on station
        Optional<ChargingStation> stationOpt = stationRepository.findById(booking.getStationId());
        if (stationOpt.isPresent()) {
            ChargingStation station = stationOpt.get();
            if (station.getAvailablePoints() < station.getTotalPoints()) {
                station.setAvailablePoints(station.getAvailablePoints() + 1);
                stationRepository.save(station);
            }
        }

        return bookingRepository.save(booking);
    }
}
