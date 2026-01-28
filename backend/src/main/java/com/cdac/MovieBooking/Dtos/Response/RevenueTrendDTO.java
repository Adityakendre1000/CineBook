package com.cdac.MovieBooking.Dtos.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RevenueTrendDTO {
    private String name; // e.g., "Jan", "Feb" or "Mon", "Tue"
    private BigDecimal revenue;
}
