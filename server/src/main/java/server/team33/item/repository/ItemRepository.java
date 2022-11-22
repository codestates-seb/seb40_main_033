package server.team33.item.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.team33.item.entity.Item;

import java.util.List;


public interface ItemRepository extends JpaRepository<Item, Long> {


    @Query("SELECT i FROM Item i join Category c on i.itemId = c.item.itemId WHERE c.categoryName  = :categoryName")
    Page<Item> findAllByCategoryName(Pageable pageable, @Param("categoryName") String categoryName);


//    @Query("SELECT i FROM Item i where i.brand = :brand")
//    List<Item> findAllCategoryNameAndBrand(@Param("categoryName") String categoryName, @Param("brand") String brand);
//
//    @Query("SELECT i From Item i where i.discountPrice > 0")
//    List<Item> findAllCategoryNameSaleItem(@Param("categoryName") String categoryName);
//
//    @Query()
//    List<Item> find9BestItemAnd9SaleItem();

}
