package server.team33.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.team33.item.dto.ItemSimpleResponseDto;

import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.time.ZonedDateTime;

public class ItemCartDto {

    @Getter
    public static class Post {

        @Min(value = 1, message = "수량은 1개 이상 선택해주세요.")
        private Integer quantity;

        private Integer period;
//        private boolean buyNow; 장바구니에 담을 경우 디폴트 == 장바구니에서 선택된 상태
        private boolean subscription;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {

        @Positive
        private Long itemCartId;

        @Positive
        private Integer quantity;

        private Integer period;
        private boolean buyNow;
        private boolean subscription;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private Long itemCartId;
        private Integer quantity;
        private Integer period;
        private boolean buyNow;
        private boolean subscription;
        private ItemSimpleResponseDto item;
        private ZonedDateTime createdAt;
        private ZonedDateTime updatedAt;
    }
}
