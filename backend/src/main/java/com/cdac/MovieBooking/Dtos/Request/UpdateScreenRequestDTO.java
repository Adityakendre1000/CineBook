package com.cdac.MovieBooking.Dtos.Request;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import com.cdac.MovieBooking.Entities.Enums.LayoutType;

@Data
public class UpdateScreenRequestDTO {

    @NotNull(message = "Layout Type is required")
    private LayoutType layoutType;

    // Map of Row Name to SeatType
    private java.util.Map<String, String> rowConfig;
}
