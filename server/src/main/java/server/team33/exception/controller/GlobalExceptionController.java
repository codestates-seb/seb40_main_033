package server.team33.exception.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.response.ErrorResponse;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionController {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e ){
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(
            ConstraintViolationException e ){
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleBusinessLogicException( BusinessLogicException e ){
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getCode()));
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e ){

        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return new ResponseEntity<ErrorResponse>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e ){

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());

        return new ResponseEntity<ErrorResponse>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e ){

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());

        return new ResponseEntity<ErrorResponse>(response, HttpStatus.BAD_REQUEST);
    }

}
