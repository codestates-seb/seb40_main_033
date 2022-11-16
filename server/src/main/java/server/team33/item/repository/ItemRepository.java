package server.team33.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.item.entity.Item;


public interface ItemRepository extends JpaRepository<Item, Long> {

}
