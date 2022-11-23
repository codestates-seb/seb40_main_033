package server.team33.wish.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.team33.item.entity.Item;
import server.team33.user.entity.User;
import server.team33.wish.entity.Wish;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Long> {


    Wish findByItemAndUser(Item item, User user);
    List<Wish> findAllByItem(long itemId);

//    @Query("SELECT sum()")
//    int findWishValue(@Param("itemId") long itemId);
}
