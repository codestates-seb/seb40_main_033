package server.team33.cart.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.team33.audit.Auditable;
import server.team33.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Cart extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @Column(nullable = false)
    private Integer totalItems = 0;

    @Column(nullable = false)
    private Integer totalPrice = 0;

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.PERSIST)
    List<ItemCart> itemCarts = new ArrayList<>();

    public void setUser(User user) {
        this.user = user;
    }

    public void addItemCart(ItemCart itemCart) {
        this.itemCarts.add(itemCart);
        if(itemCart.getCart() != this) {
            itemCart.addCart(this);
        }
    }
    // 회원 한 명이 하나의 장바구니를 가지므로 회원당 1회만 장바구니 생성
    public static Cart createCart(User user) {
        Cart cart = new Cart();
        cart.user = user;
        return cart;
    }
}
