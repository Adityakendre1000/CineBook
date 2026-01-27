package com.cdac.MovieBooking.Dtos.Request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatRequestDTO {
    private String seatNumber;   // A1, A2, B1
    private String seatType;     // REGULAR, PREMIUM, RECLINER
}
