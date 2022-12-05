package server.team33.order.reposiroty;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import server.team33.order.entity.Order;
import server.team33.order.entity.OrderStatus;
import server.team33.user.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAllByUserAndSubscriptionAndOrderStatusNot(
            Pageable pageable, User user, boolean subscription, OrderStatus orderStatus1);

    Page<Order> findAllByUserAndSubscriptionAndOrderStatusNotAndOrderStatusNot(
            Pageable pageable, User user, boolean subscription, OrderStatus orderStatus1, OrderStatus orderStatus2
    );

    @Query("Select distinct o from ORDERS o join ITEM_ORDERS io on o.orderId = io.order.orderId " +
            "where io.item.itemId = :itemId and o.user.userId = :userId")
    Order findByItemAndUser(@Param("itemId") long itemId, @Param("userId") long userId);

    Page<Order> findAllByUserAndOrderStatus(Pageable pageable, User user, OrderStatus orderStatus);
}
