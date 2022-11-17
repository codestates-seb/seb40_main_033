package server.team33.cart.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.team33.response.MultiResponseDto;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class CartResponseDto {

    @Positive
    private Long cartId;
    private boolean subscription;
    private MultiResponseDto<ItemCartDto.Response> itemCartResponses;
    private int totalItems;
    private int totalPrice;
    private int totalDiscountPrice;
    private int expectPrice; // 결제 예상 금액 (totalPrice - totalDiscountPrice)
}
