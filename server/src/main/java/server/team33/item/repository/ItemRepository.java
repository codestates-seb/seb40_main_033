package server.team33.item.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.team33.item.entity.Brand;
import server.team33.item.entity.Item;

import java.util.List;


public interface ItemRepository extends JpaRepository<Item, Long> {


    @Query("SELECT i FROM Item i join Category c on i.itemId = c.item.itemId WHERE c.categoryName  = :categoryName")
    Page<Item> findAllByCategoryName(Pageable pageable, @Param("categoryName") String categoryName);


    @Query("SELECT i FROM Item i join Category c on i.itemId = c.item.itemId WHERE c.categoryName = :categoryName AND i.brand = :brand")
    Page<Item> findAllCategoryNameAndBrand(Pageable pageable, @Param("categoryName") String categoryName, @Param("brand") Brand brand);



    @Query("SELECT i FROM Item i join Category c on i.itemId = c.item.itemId WHERE c.categoryName = :categoryName AND i.discountRate > 0")
    Page<Item> findAllCategoryNameAndDiscountRate(Pageable pageable, @Param("categoryName") String categoryName);


    @Query(value = "SELECT i FROM Item i join Category c on i.itemId = c.item.itemId WHERE c.categoryName = :categoryName AND i.brand = :brand AND i.discountRate > 0")
    Page<Item> findAllCategoryNameAndDiscountRateAndBrand(Pageable pageable, @Param("categoryName") String categoryName, @Param("brand") Brand brand);


    @Query(value = "SELECT * FROM ITEM Order by sales desc limit 9", nativeQuery = true)
    List<Item> findOrderByBestItem();


    @Query(value = "SELECT * FROM ITEM where item.discount_rate > 0 order by discount_rate desc limit 9", nativeQuery = true)
    List<Item> findOrderBySaleItem();

}
