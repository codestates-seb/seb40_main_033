package server.team33.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.category.entity.Category;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByCategoryName(String categoryName);

}
