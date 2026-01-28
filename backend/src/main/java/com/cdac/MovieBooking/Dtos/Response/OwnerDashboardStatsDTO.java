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
public class OwnerDashboardStatsDTO {
    private BigDecimal revenue;
    private Long ticketsSold;
    private Long activeScreens;
}
