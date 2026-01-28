package com.cdac.MovieBooking.Entities;

import com.cdac.MovieBooking.Entities.Enums.TheatreApprovalStatus;
import com.cdac.MovieBooking.Entities.Enums.TheatreStatus;
import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "theatres")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long theatreId;

    private String theatreName;

    private String location;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private TheatreApprovalStatus theatreApprovalStatus = com.cdac.MovieBooking.Entities.Enums.TheatreApprovalStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    private LocalDateTime approvedAt;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private TheatreStatus theatreStatus = TheatreStatus.INACTIVE;

    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @org.hibernate.annotations.SQLRestriction("is_active = true")
    private java.util.List<Screen> screens;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
