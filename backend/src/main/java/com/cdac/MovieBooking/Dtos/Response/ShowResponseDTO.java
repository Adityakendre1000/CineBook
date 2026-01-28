package com.cdac.MovieBooking.Dtos.Response;

import java.math.BigDecimal;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShowResponseDTO {

    private Long showId;
    private LocalDateTime showTime;
    private BigDecimal price;

    // Theatre details
    private Long screenId;
    private Integer screenNumber;
    private String theatreName;
    private String location;
    private String layoutType;
    private Integer availableSeats;

    // Movie details
    private Long movieId;
    private String movieTitle;
    private String posterUrl;
    private Integer durationMinutes;
    private String language;
    private String genre;
}
