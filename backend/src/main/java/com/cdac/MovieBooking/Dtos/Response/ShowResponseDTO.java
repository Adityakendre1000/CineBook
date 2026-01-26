package com.cdac.MovieBooking.Dtos.Response;
import java.math.BigDecimal;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShowResponseDTO {

    private Long showId;
    private LocalDateTime showTime;

    private BigDecimal price;


    private Long screenId;
    private String theatreName;
    private String location;
}
