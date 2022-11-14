package server.team33.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
public class UserSignUpDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String displayName;
    @NotBlank
    private String address;
    @NotBlank
    private String realName;
    @NotBlank
    private String phoneNumber;



}
