package com.cdac.MovieBooking.Dtos.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenreOccupancyDTO {
    private String name; // Genre name
    private Long value; // Count of bookings
}
