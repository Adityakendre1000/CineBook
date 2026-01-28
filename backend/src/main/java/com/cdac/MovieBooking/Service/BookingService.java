package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.BookingInitiateRequest;
import com.cdac.MovieBooking.Dtos.Response.BookingResponse;
import com.cdac.MovieBooking.Dtos.Response.RazorpayOrderResponse;
import com.cdac.MovieBooking.Entities.User;

public interface BookingService {
    RazorpayOrderResponse initiateBooking(User user, BookingInitiateRequest request);
}

