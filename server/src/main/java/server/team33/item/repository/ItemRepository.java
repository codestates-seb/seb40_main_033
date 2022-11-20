package server.team33.item.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.team33.item.entity.Item;

import java.util.List;


public interface ItemRepository extends JpaRepository<Item, Long> {


    @Query(value = "SELECT * FROM ITEM i JOIN ITEM_CATEGORY ic ON I.item_id = IC.item_id WHERE category_id = :categoryId", nativeQuery = true)
    List<Item> findAllByCategoryId(@Param("categoryId") long categoryId);


//    @Query("SELECT i FROM Item i where i.brand = :brand")
//    List<Item> findAllCategoryNameAndBrand(@Param("categoryName") String categoryName, @Param("brand") String brand);
//
//    @Query("SELECT i From Item i where i.discountPrice > 0")
//    List<Item> findAllCategoryNameSaleItem(@Param("categoryName") String categoryName);
//
//    @Query()
//    List<Item> find9BestItemAnd9SaleItem();

}
