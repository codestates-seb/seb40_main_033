package server.team33.order.reposiroty;

import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.order.entity.ItemOrder;

public interface ItemOrderRepository extends JpaRepository<ItemOrder, Long> {

}
