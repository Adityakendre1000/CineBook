package com.cdac.MovieBooking.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_seats")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(BookingSeatId.class)
public class BookingSeat {

    @Id
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Id
    @ManyToOne
    @JoinColumn(name = "show_seat_id")
    private ShowSeat showSeat;
}

