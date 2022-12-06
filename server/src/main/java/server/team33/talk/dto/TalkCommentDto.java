package server.team33.talk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TalkCommentDto { // 상세페이지

    private long talkCommentId;
    private long userId;
    private String displayName;
    private String content;
    private boolean shopper;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
