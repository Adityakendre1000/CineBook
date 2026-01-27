package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.BookingInitiateRequest;
import com.cdac.MovieBooking.Dtos.Response.RazorpayOrderResponse;
import com.cdac.MovieBooking.Entities.Booking;
import com.cdac.MovieBooking.Entities.BookingSeat;
import com.cdac.MovieBooking.Entities.Enums.BookingStatus;
import com.cdac.MovieBooking.Entities.Enums.ShowSeatStatus;
import com.cdac.MovieBooking.Entities.ShowSeat;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Exception.InvalidPaymentException;
import com.cdac.MovieBooking.Exception.InvalidRequestException;
import com.cdac.MovieBooking.Exception.ResourceNotFoundException;
import com.cdac.MovieBooking.Repository.BookingRepository;
import com.cdac.MovieBooking.Repository.BookingSeatRepository;
import com.cdac.MovieBooking.Repository.ShowSeatRepository;
import com.cdac.MovieBooking.Service.BookingService;
import com.cdac.MovieBooking.Service.RazorpayService;
import com.razorpay.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final ShowSeatRepository showSeatRepo;
    private final BookingRepository bookingRepo;
    private final BookingSeatRepository bookingSeatRepo;
    private final RazorpayService razorpayService;

    @Override
    public RazorpayOrderResponse initiateBooking(User user, BookingInitiateRequest request) {

        log.info(
                "Initiating booking for userId={}, showId={}, showSeatIds={}",
                user.getUserId(),
                request.getShowId(),
                request.getShowSeatIds()
        );

        // 1️. Lock show seats (PESSIMISTIC_WRITE)
        List<ShowSeat> seats = showSeatRepo.lockSeats(
                request.getShowId(),
                request.getShowSeatIds()
        );

        if (seats.size() != request.getShowSeatIds().size()) {
            throw new ResourceNotFoundException(
                    "One or more selected seats do not exist"
            );
        }

        // 2️. Validate availability
        for (ShowSeat seat : seats) {
            if (seat.getShowSeatStatus() != ShowSeatStatus.AVAILABLE) {
                throw new InvalidRequestException(
                        "Seats are no longer available"
                );
            }
        }

        // 3️. Lock seats
        seats.forEach(seat -> {
            seat.setShowSeatStatus(ShowSeatStatus.LOCKED);
            seat.setLockedByUser(user);
            seat.setLockTime(LocalDateTime.now());
        });

        // 4️. Calculate total amount (seat-wise pricing)
        BigDecimal totalAmount = seats.stream()
                .map(ShowSeat::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 5️. Create booking (PENDING)
        Booking booking = bookingRepo.save(
                Booking.builder()
                        .user(user)
                        .show(seats.get(0).getShow())
                        .totalAmount(totalAmount)
                        .bookingStatus(BookingStatus.PENDING)
                        .build()
        );

        log.info(
                "Booking created: bookingId={}, totalAmount={}",
                booking.getBookingId(),
                totalAmount
        );

        // 6️. Map booking ↔ show seats
        seats.forEach(seat ->
                bookingSeatRepo.save(new BookingSeat(booking, seat))
        );

        // 7️. Create Razorpay order
        Order order =
                razorpayService.createOrder(totalAmount, booking.getBookingId());

        // 8️. Save Razorpay order ID
        booking.setRazorpayOrderId(order.get("id"));
        bookingRepo.save(booking);

        log.info(
                "Razorpay order created: orderId={} for bookingId={}",
                order.get("id"),
                booking.getBookingId()
        );

        // 9️. Return response
        return new RazorpayOrderResponse(
                order.get("id"),
                booking.getBookingId(),
                totalAmount,
                "INR"
        );
    }
}
