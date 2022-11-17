package server.team33.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.ZonedDateTime;


public class UserDto {
    @Getter
    @Setter
    @Builder
    public static class Post {
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
        private String phone;
    }
    @Getter
    @Builder
    public static class Get {

        private String email;

        private String displayName;

        private String address;

        private String realName;

        private String phone;
    }

    @Getter
    @Builder
    public static class Response {

        private String email;

        private String displayName;

        private String address;

        private String realName;

        private String phone;

        private String password;
        private ZonedDateTime updatedAt;
    }
}
