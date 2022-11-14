package server.team33.exception.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import server.team33.exception.bussiness.ExceptionCode;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@JsonInclude(value = JsonInclude.Include.NON_EMPTY) //해당 필드가 null값이면 반환하지 않는다.
public class ErrorResponse {
    private int status;
    private String message;


    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;

    @Builder
    private ErrorResponse( int status, String message ){
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(
            final List<FieldError> fieldErrors, final List<ConstraintViolationError> violationErrors ){
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    public static ErrorResponse of( BindingResult bindingResult ){
        return new ErrorResponse(FieldError.of(bindingResult), null);
    }

    public static ErrorResponse of( Set<ConstraintViolation<?>> violations ){
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }

    public static ErrorResponse of( ExceptionCode exceptionCode ){// 비지니스 예외처리 할 때 사용
        return new ErrorResponse(exceptionCode.getCode(), exceptionCode.getMessage());
    }

    public static ErrorResponse of( HttpStatus httpStatus ){//저장되어 있는 문구
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of( HttpStatus httpStatus, String message ){ //직접 쓰는 문
        return new ErrorResponse(httpStatus.value(), message);
    }

    @Getter
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

        private FieldError( String field, Object rejectedValue, String reason ){
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<FieldError> of( BindingResult bindingResult ){
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream().map(error -> new FieldError(error.getField(), error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(), error.getDefaultMessage())).collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError(
                String propertyPath, Object rejectedValue, String reason ){
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(
                Set<ConstraintViolation<?>> constraintViolations ){
            return constraintViolations.stream().map(constraintViolation -> new ConstraintViolationError(constraintViolation.getPropertyPath().toString(), constraintViolation.getInvalidValue().toString(), constraintViolation.getMessage())).collect(Collectors.toList());
        }
    }
}