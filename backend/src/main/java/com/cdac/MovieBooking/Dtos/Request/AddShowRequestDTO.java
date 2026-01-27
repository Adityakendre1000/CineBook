package com.cdac.MovieBooking.Dtos.Request;

import com.cdac.MovieBooking.Entities.Enums.SeatType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class AddShowRequestDTO {
    @NotNull
    private Long screenId;
    @NotNull
    private Long movieId;
    @NotNull
    private LocalDateTime showTime;


    // seatType → price mapping decided by owner
    @NotEmpty
    private Map<SeatType, BigDecimal> seatTypePrices;
}
