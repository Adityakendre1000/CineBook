package com.cdac.MovieBooking.Entities;

import com.cdac.MovieBooking.Entities.Enums.SeatType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    @ManyToOne
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

    private String seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatType seatType;
}

