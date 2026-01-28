package com.cdac.MovieBooking.Dtos.Response;

import com.cdac.MovieBooking.Entities.Enums.BookingStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {

    // Booking info
    private Long bookingId;
    private BookingStatus bookingStatus;
    private LocalDateTime bookingTime;
    private BigDecimal totalAmount;

    // Show info
    private Long showId;
    private LocalDateTime showTime;
    private BigDecimal showPrice;

    // Movie info
    private Long movieId;
    private String movieTitle;
    private String language;
    private String genre;
    private Integer durationMinutes;
    private String posterUrl;

    // Theatre / Screen info
    private Long theatreId;
    private String theatreName;
    private Integer screenNumber;


    private List<String> seats;
}

