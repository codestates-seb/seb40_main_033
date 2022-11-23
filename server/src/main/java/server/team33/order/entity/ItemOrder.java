package server.team33.order.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import server.team33.audit.Auditable;
import server.team33.item.entity.Item;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity(name = "ITEM_ORDERS")
@NoArgsConstructor
@AllArgsConstructor
public class ItemOrder extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemOrderId;

    @Column(nullable = false)
    private Integer quantity;

    @Column
    @ColumnDefault("0")
    private Integer period;

    @Column(nullable = false)
    private boolean subscription;

    private boolean subscribing;

    @Column(name = "NEXT_DELIVERY")
    private ZonedDateTime nextDelivery;

    @Column(name = "PAYMENT_DAY")
    private ZonedDateTime paymentDay;

    @ManyToOne
    @JoinColumn(name="ITEM_ID")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;
}
