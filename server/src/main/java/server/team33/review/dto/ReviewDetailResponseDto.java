package server.team33.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.team33.item.dto.ItemSimpleResponseDto;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDetailResponseDto { // 마이페이지 - 작성한 리뷰 조회

    private long reviewId;
    private long userId;
    private ItemSimpleResponseDto item;
    private String content;
    private int star;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
