package server.team33.order.entity;

import lombok.*;
import server.team33.audit.Auditable;
import server.team33.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "ORDERS")
@NoArgsConstructor
@AllArgsConstructor
public class Order extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column
    private String detailAddress;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private boolean subscription;

    @Column
    @Setter
    private Integer totalItems; // 주문에 포함된 아이템 종류

    @Column
    @Setter
    private Integer totalPrice;

    @Column
    @Setter
    private Integer totalDiscountPrice;

    @Column
    @Setter
    private Integer expectPrice; // 실제 결제 금액 (정가 - 할인가)

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private List<ItemOrder> itemOrders = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.ORDER_REQUEST;

    @Transient
    private int totalQuantity;
    public Order( Order origin ){

        this.name = origin.getName();
        this.address = origin.getAddress();
        this.detailAddress = origin.getDetailAddress();
        this.phone = origin.getPhone();
        this.subscription = origin.isSubscription();
        this.totalItems = origin.getTotalItems();
        this.totalPrice = origin.getTotalPrice();
        this.totalDiscountPrice = origin.getTotalDiscountPrice();
        this.expectPrice = origin.getExpectPrice();
        this.user = origin.getUser();
        this.itemOrders = origin.getItemOrders();
        this.orderStatus = OrderStatus.ORDER_SUBSCRIBE;
        this.totalQuantity = origin.getTotalQuantity();
    }
}
