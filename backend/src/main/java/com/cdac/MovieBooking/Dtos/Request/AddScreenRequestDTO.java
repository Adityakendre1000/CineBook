package com.cdac.MovieBooking.Dtos.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AddScreenRequestDTO {

    @NotNull(message = "theatre ID is required")
    private Long theatreId;

    @NotNull(message = "Layout Type is required")

    @NotNull(message = "Layout Type is required")
    private com.cdac.MovieBooking.Entities.Enums.LayoutType layoutType;

    // Map of Row Name (e.g., "A", "A-D") to SeatType (NORMAL, PRIME, RECLINER)
    private java.util.Map<String, String> rowConfig;

}
