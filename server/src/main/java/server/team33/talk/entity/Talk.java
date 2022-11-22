package server.team33.talk.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import server.team33.audit.Auditable;
import server.team33.item.entity.Item;
import server.team33.user.entity.User;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Talk extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TALK_ID")
    private Long talkId;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private boolean shopper; // true == 해당 아이템을 구매한 유저

    @JsonIgnore
    @OneToMany(mappedBy = "talk", cascade = CascadeType.ALL)
    List<TalkComment> talkComments;
}
