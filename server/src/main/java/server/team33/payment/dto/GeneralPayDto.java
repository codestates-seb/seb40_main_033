package server.team33.payment.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GeneralPayDto {

    private String paymentKey;
    private String orderId;
    private int amount;
}
