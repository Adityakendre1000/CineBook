package com.cdac.MovieBooking.Exception;

import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

        //  Unauthorized actions (e.g. payment by another user)
        @ExceptionHandler(UnauthorizedActionException.class)
        public ResponseEntity<ApiResponse<Void>> handleUnauthorized(UnauthorizedActionException ex) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(ApiResponse.error(
                                "Access denied",
                                ex.getMessage()
                        ));
        }

        //  Payment related errors
        @ExceptionHandler(InvalidPaymentException.class)
        public ResponseEntity<ApiResponse<Void>> handlePaymentError(InvalidPaymentException ex) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error(
                                "Payment failed",
                                ex.getMessage()
                        ));
        }

        // Resource not found
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(
                                "Resource not found",
                                ex.getMessage()
                        ));
        }

        //  runtime exceptions
        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<ApiResponse<Void>> handleRuntime(RuntimeException ex) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error(
                                "Request failed",
                                ex.getMessage()
                        ));
        }

        public ResponseEntity<ApiResponse<Void>> handleInvalidRequest(
                InvalidRequestException ex
        ) {
                return ResponseEntity
                        .badRequest()
                        .body(ApiResponse.error("Invalid request", ex.getMessage()));
        }


        //  unexpected errors
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception ex) {
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ApiResponse.error(
                                "Something went wrong",
                                ex.getMessage()
                        ));
        }
}
