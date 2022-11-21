package server.team33.exception.controller;


import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.DataException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.response.ErrorResponse;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class ExceptionController {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> methodArgumentNotValidException(
            MethodArgumentNotValidException e ){
        ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> constraintViolationException(
            ConstraintViolationException e ){
        ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> businessLogicException( BusinessLogicException e ){
        ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        log.error("비지니스 예외 처리");
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getCode()));
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> httpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e ){

        ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> httpMessageNotReadableException(
            HttpMessageNotReadableException e ){

        ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> missingServletRequestParameterException(
            MissingServletRequestParameterException e ){

        ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> internalAuthenticationException(
            InternalAuthenticationServiceException e ){

        ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> expiredJwtException(
            ExpiredJwtException e ){

        ErrorResponse response = ErrorResponse.of(HttpStatus.NOT_IMPLEMENTED, e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_IMPLEMENTED);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> incorrectResultSizeDataAccessException(
            IncorrectResultSizeDataAccessException e ){
        ErrorResponse response = ErrorResponse.of(HttpStatus.NOT_ACCEPTABLE, "이미 가입한 아이디가 있습니다.");

        return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
    }
  @ExceptionHandler
    public ResponseEntity<ErrorResponse> HttpClientErrorException(
            HttpClientErrorException e ){
        ErrorResponse response = ErrorResponse.of(HttpStatus.NOT_ACCEPTABLE, "잘못된 요청입니다.");

        return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
    }


    @ExceptionHandler
    public ResponseEntity<ErrorResponse> dataException(
            DataException e ){

        ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
