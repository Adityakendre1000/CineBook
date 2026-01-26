package com.cdac.MovieBooking.Dtos.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AddScreenRequestDTO {

    @NotNull(message = "theatre ID is required")
    private Long theatreId;

    @NotNull
    @Min(value=1,message = "Screen Number is required")
    private int screenNumber;

    @NotNull
    @Min(value = 1,message="Total seats are required")
    private int totalSeats;


}
