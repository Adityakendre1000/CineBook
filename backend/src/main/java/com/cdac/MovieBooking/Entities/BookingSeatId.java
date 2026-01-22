package com.cdac.MovieBooking.Entities;

import java.io.Serializable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingSeatId implements Serializable {
    private Long booking;
    private Long showSeat;
}

