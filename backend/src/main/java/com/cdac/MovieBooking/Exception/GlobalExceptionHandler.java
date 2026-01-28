package com.cdac.MovieBooking.Exception;

import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.http.converter.HttpMessageNotReadableException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

        // Unauthorized actions (e.g. payment by another user)
        @ExceptionHandler(UnauthorizedActionException.class)
        public ResponseEntity<ApiResponse<Void>> handleUnauthorized(UnauthorizedActionException ex) {
                return ResponseEntity
                                .status(HttpStatus.FORBIDDEN)
                                .body(ApiResponse.error(
                                                "Access denied",
                                                ex.getMessage()));
        }

        // Payment related errors
        @ExceptionHandler(InvalidPaymentException.class)
        public ResponseEntity<ApiResponse<Void>> handlePaymentError(InvalidPaymentException ex) {
                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(ApiResponse.error(
                                                "Payment failed",
                                                ex.getMessage()));
        }

        // Resource not found
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(ApiResponse.error(
                                                "Resource not found",
                                                ex.getMessage()));
        }

        // runtime exceptions
        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<ApiResponse<Void>> handleRuntime(RuntimeException ex) {
                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(ApiResponse.error(
                                                "Request failed",
                                                ex.getMessage()));
        }

        @ExceptionHandler(InvalidRequestException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidRequest(
                        InvalidRequestException ex) {
                return ResponseEntity
                                .badRequest()
                                .body(ApiResponse.error("Invalid request", ex.getMessage()));
        }

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ApiResponse<Void>> handleIllegalArgument(IllegalArgumentException ex) {
                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(ApiResponse.error(
                                                "Invalid argument",
                                                ex.getMessage()));
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
                String message = ex.getBindingResult().getFieldErrors().stream()
                                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                                .collect(java.util.stream.Collectors.joining(", "));
                return ResponseEntity.badRequest().body(ApiResponse.error("Validation failed", message));
        }

        @ExceptionHandler({ HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class })
        public ResponseEntity<ApiResponse<Void>> handleInputErrors(Exception ex) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Invalid input format", ex.getMessage()));
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception ex) {
                log.error("CRITICAL ERROR: ", ex);
                return ResponseEntity
                                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(ApiResponse.error(
                                                "Something went wrong",
                                                ex.getMessage()));
        }
}
