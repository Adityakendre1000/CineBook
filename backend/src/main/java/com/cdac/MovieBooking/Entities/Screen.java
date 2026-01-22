package com.cdac.MovieBooking.Entities;

import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "screens",
        uniqueConstraints = @UniqueConstraint(columnNames = {"theatre_id", "screen_number"})
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Screen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ScreenId;

    @ManyToOne
    @JoinColumn(name = "theatre_id", nullable = false)
    private Theatre theatre;

    private int screenNumber;
    private int totalSeats;
    private boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

