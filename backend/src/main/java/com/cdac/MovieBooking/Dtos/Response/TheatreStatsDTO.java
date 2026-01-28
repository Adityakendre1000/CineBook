package com.cdac.MovieBooking.Dtos.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TheatreStatsDTO {
    private BigDecimal revenue;
    private Long visitors; // Tickets sold
    private Double occupancy; // Percentage
    private Long activeShows;
}
