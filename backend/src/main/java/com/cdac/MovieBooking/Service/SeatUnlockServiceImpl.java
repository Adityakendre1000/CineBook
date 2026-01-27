package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Entities.Booking;
import com.cdac.MovieBooking.Entities.Enums.BookingStatus;
import com.cdac.MovieBooking.Entities.Enums.ShowSeatStatus;
import com.cdac.MovieBooking.Entities.ShowSeat;
import com.cdac.MovieBooking.Repository.BookingRepository;
import com.cdac.MovieBooking.Repository.BookingSeatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class SeatUnlockServiceImpl implements SeatUnlockService {

    private final BookingRepository bookingRepo;
    private final BookingSeatRepository bookingSeatRepo;

    // Runs every 5 minutes
    @Override
    @Scheduled(fixedRate = 600000)
    @Transactional
    public void releaseExpiredSeatLocks() {

        LocalDateTime expiryTime = LocalDateTime.now().minusMinutes(10);

        List<Booking> pendingBookings =
                bookingRepo.findByBookingStatus(BookingStatus.PENDING);

        for (Booking booking : pendingBookings) {

            var bookingSeats = bookingSeatRepo.findByBooking(booking);

            // 1️. Case A: At least one seat is LOCKED but expired
            boolean hasExpiredLockedSeat = bookingSeats.stream()
                    .map(bs -> bs.getShowSeat())
                    .anyMatch(seat ->
                            seat.getShowSeatStatus() == ShowSeatStatus.LOCKED &&
                                    seat.getLockTime() != null &&
                                    seat.getLockTime().isBefore(expiryTime)
                    );

            // 2️. Case B: Booking is PENDING but NO seats are locked anymore
            boolean noSeatLocked = bookingSeats.stream()
                    .map(bs -> bs.getShowSeat())
                    .noneMatch(seat ->
                            seat.getShowSeatStatus() == ShowSeatStatus.LOCKED
                    );

            // If neither condition applies, booking is still valid
            if (!hasExpiredLockedSeat && !noSeatLocked) {
                continue;
            }

            //  LOG: auto-unlock triggered
            log.warn(
                    "Auto-cancelling bookingId={} due to expired or released seat locks",
                    booking.getBookingId()
            );

            // 3️. Cancel booking
            booking.setBookingStatus(BookingStatus.CANCELLED);

            // 4️. Ensure ALL seats are released
            for (var bs : bookingSeats) {
                ShowSeat seat = bs.getShowSeat();
                seat.setShowSeatStatus(ShowSeatStatus.AVAILABLE);
                seat.setLockedByUser(null);
                seat.setLockTime(null);
            }
        }
    }
}

