package com.echarge.backend.controller;

import com.echarge.backend.dto.ApiResponse;
import com.echarge.backend.dto.BookingRequest;
import com.echarge.backend.model.Booking;
import com.echarge.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> createBooking(@Valid @RequestBody BookingRequest request) {
        try {
            Booking booking = bookingService.createBooking(request);
            return ResponseEntity.ok(ApiResponse.ok("Charging bay slot reserved successfully!", booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to reserve slot: " + e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Booking>>> getUserBookings(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(ApiResponse.ok(bookings));
    }

    @GetMapping("/email")
    public ResponseEntity<ApiResponse<List<Booking>>> getUserBookingsByEmail(@RequestParam String email) {
        List<Booking> bookings = bookingService.getUserBookingsByEmail(email);
        return ResponseEntity.ok(ApiResponse.ok(bookings));
    }

    @GetMapping("/ref/{reference}")
    public ResponseEntity<ApiResponse<Booking>> getBookingByRef(@PathVariable String reference) {
        Optional<Booking> booking = bookingService.getBookingByReference(reference);
        return booking.map(b -> ResponseEntity.ok(ApiResponse.ok(b)))
                .orElseGet(() -> ResponseEntity.badRequest().body(ApiResponse.error("Booking not found")));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<Booking>> cancelBooking(@PathVariable Long id) {
        try {
            Booking cancelled = bookingService.cancelBooking(id);
            return ResponseEntity.ok(ApiResponse.ok("Booking cancelled successfully", cancelled));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
