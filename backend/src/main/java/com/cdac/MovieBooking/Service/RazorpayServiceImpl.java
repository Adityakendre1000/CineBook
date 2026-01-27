package com.cdac.MovieBooking.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Slf4j
@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    private final RazorpayClient razorpayClient;

    @Override
    public Order createOrder(BigDecimal amount, Long bookingId) {
        try {
            JSONObject options = new JSONObject();
            options.put("amount", amount.multiply(BigDecimal.valueOf(100)));
            options.put("currency", "INR");
            options.put("receipt", "booking_" + bookingId);

            return razorpayClient.orders.create(options);

        } catch (RazorpayException e) {
            throw new RuntimeException("Razorpay order creation failed", e);
        }
    }
}

