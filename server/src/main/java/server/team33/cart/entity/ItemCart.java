package server.team33.cart.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import server.team33.audit.Auditable;
import server.team33.item.entity.Item;


import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "ITEM_CART")
public class ItemCart extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemCartId;

    @Column(nullable = false)
    private Integer quantity;

    @Column
    @ColumnDefault("0")
    private Integer period;

    @Column(nullable = false)
    private boolean buyNow;

    @Column(nullable = false)
    private boolean subscription;

    @ManyToOne
    @JoinColumn(name = "CART_ID")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    public void addCart(Cart cart) {
        this.cart = cart;
        if(!this.cart.getItemCarts().contains(this)) {
            this.cart.getItemCarts().add(this);
        }
    }

    // 장바구니에 같은 상품을 또 담을 경우 수량만 증가
    public void addQuantity(int quantity) {
        this.quantity += quantity;
    }

//    @PrePersist
//    public void prePersist() {
//        this.period = this.period == null ? 0 : this.period;
//    }
}
