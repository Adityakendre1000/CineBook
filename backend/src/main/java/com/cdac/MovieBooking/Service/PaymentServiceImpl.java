package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.PaymentFailureRequest;
import com.cdac.MovieBooking.Dtos.Request.PaymentVerifyRequest;
import com.cdac.MovieBooking.Entities.Booking;
import com.cdac.MovieBooking.Entities.BookingSeat;
import com.cdac.MovieBooking.Entities.Enums.BookingStatus;
import com.cdac.MovieBooking.Entities.Enums.PaymentMethod;
import com.cdac.MovieBooking.Entities.Enums.PaymentStatus;
import com.cdac.MovieBooking.Entities.Enums.ShowSeatStatus;
import com.cdac.MovieBooking.Entities.Payment;
import com.cdac.MovieBooking.Entities.ShowSeat;
import com.cdac.MovieBooking.Exception.InvalidPaymentException;
import com.cdac.MovieBooking.Exception.ResourceNotFoundException;
import com.cdac.MovieBooking.Exception.UnauthorizedActionException;
import com.cdac.MovieBooking.Repository.BookingRepository;
import com.cdac.MovieBooking.Repository.BookingSeatRepository;
import com.cdac.MovieBooking.Repository.PaymentRepository;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final BookingRepository bookingRepo;
    private final BookingSeatRepository bookingSeatRepo;
    private final PaymentRepository paymentRepo;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    @Override
    public void verifyPayment(PaymentVerifyRequest request, Long loggedInUserId) {

        //  LOG 1: payment verification start
        log.info(
                "Verifying payment for razorpayOrderId={}, userId={}",
                request.getRazorpayOrderId(),
                loggedInUserId
        );

        // 1️. Verify Razorpay signature
        boolean isValid;
        try {
            isValid = Utils.verifySignature(
                    request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId(),
                    request.getRazorpaySignature(),
                    razorpaySecret
            );
        } catch (Exception e) {
            throw new InvalidPaymentException(
                    "Razorpay signature verification failed"
            );
        }

        if (!isValid) {
            throw new InvalidPaymentException("Invalid Razorpay signature");
       }

        // 2️. Fetch booking
        Booking booking = bookingRepo
                .findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found for Razorpay order"
                        ));

        // 3️. User ownership validation
        if (!booking.getUser().getUserId().equals(loggedInUserId)) {
            throw new UnauthorizedActionException(
                    "You are not authorized to verify this payment"
            );
        }

        // 4️. Idempotency check
        if (booking.getBookingStatus() == BookingStatus.CONFIRMED) {
            log.warn(
                    "Duplicate payment verification ignored for bookingId={}",
                    booking.getBookingId()
            );
            return;
        }

        // 5️. Confirm booking
        booking.setBookingStatus(BookingStatus.CONFIRMED);

        // 6️. Mark seats as BOOKED
        for (BookingSeat bs : bookingSeatRepo.findByBooking(booking)) {
            ShowSeat seat = bs.getShowSeat();
            seat.setShowSeatStatus(ShowSeatStatus.BOOKED);
            seat.setLockedByUser(null);
            seat.setLockTime(null);
        }

        // 7️. Save payment
        paymentRepo.save(
                Payment.builder()
                        .booking(booking)
                        .paymentMethod(PaymentMethod.UPI)
                        .transactionId(request.getRazorpayPaymentId())
                        .amount(booking.getTotalAmount())
                        .paymentStatus(PaymentStatus.SUCCESS)
                        .build()
        );

        //  LOG 2: payment success
        log.info(
                "Payment SUCCESS: bookingId={}, paymentId={}",
                booking.getBookingId(),
                request.getRazorpayPaymentId()
        );
    }

    @Override
    public void handlePaymentFailure(PaymentFailureRequest request, Long loggedInUserId) {

        //  LOG 3: payment failure received
        log.warn(
                "Payment FAILURE received for razorpayOrderId={}, userId={}, reason={}",
                request.getRazorpayOrderId(),
                loggedInUserId,
                request.getReason()
        );

        // 1️. Fetch booking
        Booking booking = bookingRepo
                .findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found for Razorpay order"
                        ));

        // 2️. User ownership validation
        if (!booking.getUser().getUserId().equals(loggedInUserId)) {
            throw new UnauthorizedActionException(
                    "You are not authorized to cancel this booking"
            );
        }

        // 3️. Idempotency
        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            return;
        }

        // 4️. Cancel booking
        booking.setBookingStatus(BookingStatus.CANCELLED);

        // 5️. Release seats
        bookingSeatRepo.findByBooking(booking)
                .forEach(bs -> {
                    ShowSeat seat = bs.getShowSeat();
                    seat.setShowSeatStatus(ShowSeatStatus.AVAILABLE);
                    seat.setLockedByUser(null);
                    seat.setLockTime(null);
                });

        // 6️. Save failed payment
        paymentRepo.save(
                Payment.builder()
                        .booking(booking)
                        .paymentMethod(PaymentMethod.UPI)
                        .transactionId(null)
                        .amount(booking.getTotalAmount())
                        .paymentStatus(PaymentStatus.FAILED)
                        .build()
        );
    }
}
