package server.team33.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.cart.entity.Cart;
import server.team33.cart.entity.ItemCart;
import server.team33.item.entity.Item;

import java.util.List;

public interface ItemCartRepository extends JpaRepository<ItemCart, Long> {

    ItemCart findByCartAndItem(Cart cart, Item item);

    List<ItemCart> findAllByCartAndSubscription(Cart cart, boolean subscription);

    void deleteByItemAndCart(Item item, Cart cart); // 주문시 장바구니에서 아이템 삭제
}
