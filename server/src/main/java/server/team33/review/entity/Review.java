package server.team33.review.entity;

import lombok.*;
import server.team33.item.entity.Item;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Review {

    @Id
    @GeneratedValue
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    //private User user;

    private String content;

    private int star;
}
