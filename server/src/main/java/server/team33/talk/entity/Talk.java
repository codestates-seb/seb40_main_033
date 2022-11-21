package server.team33.talk.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import server.team33.item.entity.Item;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Talk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TALK_ID")
    private Long talkId;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    //private User user;

    private String content;

    private boolean isShopper;

    @JsonIgnore
    @OneToMany(mappedBy = "talk", cascade = CascadeType.ALL)
    List<TalkComment> talkComments;
}
