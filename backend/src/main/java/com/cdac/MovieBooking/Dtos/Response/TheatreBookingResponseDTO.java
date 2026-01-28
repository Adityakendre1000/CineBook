package com.cdac.MovieBooking.Dtos.Response;

import com.cdac.MovieBooking.Entities.Enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TheatreBookingResponseDTO {
    private Long bookingId;
    private String movieName;
    private String showTime; // Combined Date & Time or just Time
    private LocalDate showDate;
    private String seats; // "A1, A2"
    private BigDecimal amount;
    private BookingStatus status;
    private String customerName;
}
