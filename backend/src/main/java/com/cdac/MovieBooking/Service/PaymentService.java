package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.PaymentFailureRequest;
import com.cdac.MovieBooking.Dtos.Request.PaymentVerifyRequest;

public interface PaymentService {
    void verifyPayment(PaymentVerifyRequest request, Long loggedInUserId);
    void handlePaymentFailure(PaymentFailureRequest request, Long loggedInUserId);
}

