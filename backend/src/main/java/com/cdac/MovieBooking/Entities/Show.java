package com.cdac.MovieBooking.Entities;

import com.cdac.MovieBooking.Entities.Enums.ShowStatus;
import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "shows")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showId;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

    private LocalDateTime showTime;
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private ShowStatus showStatus;

    @CreationTimestamp
    private LocalDateTime createdAt;

}

