package com.cdac.MovieBooking.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtUtil {

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    @Value("${JWT_EXP}")
    private long jwtExpirationInMilliseconds;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generate JWT
     */
    public String generateToken(Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMilliseconds);

        //JWT token has Uname, Uid, Role, CreatedTime, ExpiryTime on its body and algorithm on it's header.
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("userId", userDetails.getUserId())
                .claim("roles", authentication.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract all claims
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extract email
     */
    public String getUsernameFromToken(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * Extract userId
     */
    public Long getUserIdFromToken(String token) {
        return getClaims(token).get("userId", Long.class);
    }

    /**
     * Validate JWT
     */
    public boolean validateToken(String token) {
        try {
            getClaims(token); // single source of truth
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("JWT expired");
        } catch (MalformedJwtException e) {
            log.warn("Invalid JWT format");
        } catch (SecurityException e) {
            log.warn("Invalid JWT signature");
        } catch (UnsupportedJwtException e) {
            log.warn("Unsupported JWT");
        } catch (IllegalArgumentException e) {
            log.warn("JWT is empty");
        }
        return false;
    }
}
