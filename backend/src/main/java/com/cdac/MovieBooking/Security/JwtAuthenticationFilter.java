package com.cdac.MovieBooking.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    /**
     * This method tells Spring Security when to SKIP this JWT filter.
     *
     * We do NOT want to check JWT tokens for:
     * 1) /auth/** endpoints (login & register)
     *    → because users don’t have a token yet
     *
     * 2) OPTIONS requests
     *    → these are CORS preflight requests sent by the browser
     *    → they do not contain JWT tokens
     *
     * If this method returns true:
     * → Spring Security will NOT run doFilterInternal()
     * → JWT validation is skipped for that request
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/auth/")
                || request.getMethod().equalsIgnoreCase("OPTIONS");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // 1️. Check Authorization header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        // 2️. Validate token and extract username
        if (token != null && jwtUtil.validateToken(token)) {
            username = jwtUtil.getUsernameFromToken(token);
        }

        // 3️. Authenticate user if not already authenticated
        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    customUserDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            // 4️. Set SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}
