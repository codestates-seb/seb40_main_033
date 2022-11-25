package server.team33.wish.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.team33.item.entity.Item;
import server.team33.user.entity.User;
import server.team33.wish.entity.Wish;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Long> {


    Wish findByItemAndUser(Item item, User user);


    List<Wish> findAllByItem(long itemId);


    @Query("SELECT sum(w.isWish) from Wish w where w.item.itemId = :itemId")
    int findWishValue(@Param("itemId") long itemId);


    @Query("SELECT w FROM Wish w JOIN Item i ON w.item.itemId = i.itemId where w.user.userId = :userId")
    Page<Wish> findAllByUser(Pageable pageable, @Param("userId") long userId);
}
