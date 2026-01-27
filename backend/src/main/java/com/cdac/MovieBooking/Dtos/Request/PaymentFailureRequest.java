package com.cdac.MovieBooking.Dtos.Request;

import lombok.Data;

@Data
public class PaymentFailureRequest {
    private String razorpayOrderId;
    private String reason; // optional (FAILED / CANCELLED / TIMEOUT)
}
