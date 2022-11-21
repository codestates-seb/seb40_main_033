package server.team33.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.item.entity.Item;
import server.team33.review.entity.Review;
import server.team33.user.entity.User;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findAllByUser(Pageable pageable, User user); // 마이페이지에서 유저가 작성한 리뷰 목록을 불러옴

    List<Review> findAllByItem(Item item); // 아이템상세페이지에서 아이템의 리뷰 목록을 불러옴
}
