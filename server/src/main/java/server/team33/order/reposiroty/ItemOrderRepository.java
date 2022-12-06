package server.team33.order.reposiroty;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.OrderStatus;

public interface ItemOrderRepository extends JpaRepository<ItemOrder, Long> {

    @Query("select io from ITEM_ORDERS io join ORDERS o on io.order.orderId = o.orderId " +
            "and o.orderStatus = :orderStatus and o.user.userId = :userId and io.subscription = true")
    Page<ItemOrder> findAllSubs(Pageable pageable, OrderStatus orderStatus, long userId);
}
