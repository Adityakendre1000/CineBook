package com.cdac.MovieBooking.Dtos.Request;

import lombok.Data;

import java.util.List;

@Data
public class BookingInitiateRequest {
    private Long showId;
    private List<Long> showSeatIds;
}

