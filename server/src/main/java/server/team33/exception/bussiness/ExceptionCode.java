package server.team33.exception.bussiness;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"), // 에러 추가, 나중에 생각
    EXIST_EMAIL(409,"이미 가입한 e-mail입니다."),
    EXIST_DISPLAY_NAME(409,"이미 존재하는 닉네임입니다.");

    @Getter
    private int code;
    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
