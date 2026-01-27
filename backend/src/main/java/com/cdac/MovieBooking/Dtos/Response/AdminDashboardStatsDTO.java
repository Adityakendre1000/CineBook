package com.cdac.MovieBooking.Dtos.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardStatsDTO {
    private Long totalUsers;
    private Long activeTheaters;
    private Long totalBookings;
    private Long pendingRequests;
}
