package server.team33.order.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import server.team33.audit.Auditable;
import server.team33.item.entity.Item;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name="ITEM_ID")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;
}
