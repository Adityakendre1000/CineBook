package com.cdac.MovieBooking.Service;

import com.razorpay.Order;
import java.math.BigDecimal;

public interface RazorpayService {
    Order createOrder(BigDecimal amount, Long bookingId);
}

