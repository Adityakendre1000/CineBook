package com.cdac.MovieBooking.Entities;

import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "screens", uniqueConstraints = @UniqueConstraint(columnNames = { "theatre_id", "screen_number" }))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Screen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long screenId;

    @ManyToOne
    @JoinColumn(name = "theatre_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Theatre theatre;

    private int screenNumber;
    private int totalSeats;

    @Enumerated(EnumType.STRING)
    private com.cdac.MovieBooking.Entities.Enums.LayoutType layoutType;

    @Builder.Default
    private boolean isActive = true;

    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private java.util.List<Show> shows;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
