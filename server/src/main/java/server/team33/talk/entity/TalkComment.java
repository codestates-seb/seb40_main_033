package server.team33.talk.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class TalkComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long talkCommentId;

    @ManyToOne
    @JoinColumn(name = "TALK_ID")
    private Talk talk;

    //private User user;

    private String content;

    private boolean isShopper;
}
