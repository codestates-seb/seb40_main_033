package server.team33.talk.dto;

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
public class TalkDetailResponseDto { // 마이페이지 - 작성 토크 조회

    private long talkId;
    private long userId;
    private ItemSimpleResponseDto item;
    private String content;
    private boolean shopper;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
