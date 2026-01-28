package com.cdac.MovieBooking.Dtos.Response;

import com.cdac.MovieBooking.Entities.Enums.LayoutType;
import com.cdac.MovieBooking.Entities.Enums.SeatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatLayoutResponseDTO {
    private List<String> rows; // Unique row letters (A, B, C, etc.)
    private Map<String, List<SeatResponseDTO>> seatsByRow; // Seats grouped by row
    private LayoutType layoutType;
    private Map<SeatType, BigDecimal> priceMap; // Price for each seat type
    private Integer totalSeats;
    private Integer availableSeats;
}
