package com.cdac.MovieBooking.Dtos.Response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatResponseDTO {
    private Long seatId;
    private String seatNumber;
    private String seatType;
}
