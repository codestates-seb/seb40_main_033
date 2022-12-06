package server.team33.wish.entity;

import lombok.*;
import server.team33.item.entity.Item;
import server.team33.user.entity.User;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Wish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishId;


    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column
    private int isWish;


    public void addItem(Item item) {
        if (this.item == null && item != null) {
            this.item = item;
        }
    }

    public void addUser(User user) {
        if (this.user == null && user != null) {
            this.user = user;
        }
    }


}
