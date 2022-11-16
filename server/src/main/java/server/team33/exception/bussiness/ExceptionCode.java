package server.team33.exception.bussiness;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404,"회원 정보를 찾을 수 없습니다."),
    EXIST_EMAIL(409,"이미 가입한 e-mail입니다."),
    EXIST_DISPLAY_NAME(409,"이미 존재하는 닉네임입니다."),
    EXIST_PHONE_NUMBER(409,"이미 존재하는 연락처입니다."),
    CART_NOT_FOUND(404, "존재하지 않는 카트입니다."),
    ITEMCART_NOT_FOUND(404, "존재하지 않는 항목입니다.");

    @Getter
    private int code;
    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
