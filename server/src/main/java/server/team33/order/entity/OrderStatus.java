package server.team33.order.entity;

import lombok.Getter;

public enum OrderStatus {

    ORDER_REQUEST(1, "주문 요청"),
    ORDER_COMPLETE(2, "주문 완료"),
    ORDER_CANCEL(3, "주문 취소");

    @Getter
    private int step;

    @Getter
    private String stepDescription;

    OrderStatus(int step, String stepDescription) {
        this.step = step;
        this.stepDescription = stepDescription;
    }
}
