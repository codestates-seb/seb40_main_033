package server.team33.order.reposiroty;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.order.entity.Order;
import server.team33.user.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findAllByUserAndSubscription(Pageable pageable, User user, boolean subscription);
}
