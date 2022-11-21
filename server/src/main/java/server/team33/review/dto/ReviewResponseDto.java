package server.team33.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDto {

    private long reviewId;
    private long itemId;
    private long userId;
    private String content;
    private int star;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
