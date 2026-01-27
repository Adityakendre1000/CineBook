package com.cdac.MovieBooking.Dtos.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class RazorpayOrderResponse {
    private String razorpayOrderId;
    private Long bookingId;
    private BigDecimal amount;
    private String currency;
}

