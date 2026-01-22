package com.cdac.MovieBooking.Exception;

import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntime(
            RuntimeException ex
    ) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.error("Registration failed", ex.getMessage()));
    }
}
