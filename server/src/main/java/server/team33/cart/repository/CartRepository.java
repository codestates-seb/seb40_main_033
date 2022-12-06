package server.team33.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.cart.entity.Cart;
import server.team33.user.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByUser(User user);
}
