package server.team33.exception.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@Builder
public class ErrorResponse {
    private int status;
    private String message;
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;

    public static ErrorResponse of( BindingResult bindingResult ){
        return ErrorResponse.builder().fieldErrors(FieldError.of(bindingResult)).build();
    }

    public static ErrorResponse of( Set<ConstraintViolation<?>> violations ){
        return ErrorResponse.builder().violationErrors(ConstraintViolationError.of(violations)).build();
    }

    public static ErrorResponse of( ExceptionCode exceptionCode ){// 비지니스 예외처리 할 때 사용
            return ErrorResponse.builder().status(exceptionCode.getCode()).message(exceptionCode.getMessage()).build();
    }

    public static ErrorResponse of( HttpStatus httpStatus ){//저장되어 있는 문구
            return ErrorResponse.builder().status(httpStatus.value()).message(httpStatus.getReasonPhrase()).build();
    }

    public static ErrorResponse of( HttpStatus httpStatus, String message ){ //직접 쓰는 문장
        return ErrorResponse.builder().status(httpStatus.value()).message(message).build();
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
            return fieldErrors.stream()
                    .map(error -> new FieldError(error.getField(),
                                                 error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
                                                 error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError( String propertyPath, Object rejectedValue, String reason ){
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of( Set<ConstraintViolation<?>> constraintViolations ){
            return constraintViolations
                    .stream()
                    .map(constraintViolation -> new ConstraintViolationError(constraintViolation.getPropertyPath().toString(),
                                                                             constraintViolation.getInvalidValue().toString(),
                                                                             constraintViolation.getMessage()))
                    .collect(Collectors.toList());
        }
    }
}