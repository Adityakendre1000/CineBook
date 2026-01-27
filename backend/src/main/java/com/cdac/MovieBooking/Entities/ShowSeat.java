package com.cdac.MovieBooking.Entities;

import com.cdac.MovieBooking.Entities.Enums.ShowSeatStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "show_seats",
        uniqueConstraints = @UniqueConstraint(columnNames = {"show_id", "seat_id"})
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShowSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showSeatId;

    @ManyToOne
    @JoinColumn(name = "show_id", nullable = false)
    private Show show;

    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    @Column(nullable = false)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private ShowSeatStatus showSeatStatus;

    @ManyToOne
    @JoinColumn(name = "locked_by_user_id")
    private User lockedByUser;

    private LocalDateTime lockTime;
}
