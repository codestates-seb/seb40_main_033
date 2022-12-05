package server.team33.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import server.team33.item.entity.Brand;
import server.team33.item.entity.Item;
import server.team33.item.repository.ItemRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final BrandService brandService;


    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    // 아이템 상세페이지 조회 비지니스 로직
    public Item findItem(long itemId) {
        Item item = findVerifiedItem(itemId);
        item.setView(item.getView()+1);
        return itemRepository.save(item);
    }

    public Item findVerifiedItem(long itemId) {
        Optional<Item> item = itemRepository.findById(itemId);
        Item findItem = item.orElseThrow(() -> new RuntimeException());
        return findItem;
    }

    public Page<Item> findItems(String categoryName, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if (Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findAllByCategoryName(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName);
            return lowSortItems;
        } else {
            Page<Item> findItems = itemRepository.findAllByCategoryName(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName);
            return findItems;
        }
    }


    public Page<Item> findBrandItems(String categoryName, Brand brand, int page, int size, String sort) {
        brandService.verifyExistBrand(brand);

        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findAllCategoryNameAndBrand(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName, brand);
            return lowSortItems;
        } else {
            Page<Item> findBrandItems = itemRepository.findAllCategoryNameAndBrand(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName, brand);
            return findBrandItems;
        }
    }

    public Page<Item> findSaleItems(String categoryName, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findAllCategoryNameAndDiscountRate(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName);
            return lowSortItems;
        } else {
            Page<Item> findSaleItem = itemRepository.findAllCategoryNameAndDiscountRate(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName);
            return findSaleItem;
        }
    }

    public Page<Item> findBrandSaleItems(String categoryName, Brand brand, int page, int size, String sort) {
        brandService.verifyExistBrand(brand);
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findAllCategoryNameAndDiscountRateAndBrand(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName, brand);
            return lowSortItems;
        } else {
            Page<Item> findBrandSaleItem = itemRepository.findAllCategoryNameAndDiscountRateAndBrand(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName, brand);
            return findBrandSaleItem;
        }
    }

    public List<Item> findTop9BestItems() {
        return itemRepository.findTop9ByOrderBySalesDesc();
    }

    public List<Item> findTop9SaleItems() {
        return itemRepository.findTop9ByOrderByDiscountRateDesc();
    }

    public List<Item> findTop9MdPickItems() {
        return itemRepository.findTop9ByOrderByItemIdDesc();
    }

    public Page<Item> searchItems(String keyword, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByTitleContaining(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), keyword);

            return lowSortItems;
        } else {
            Page<Item> searchItems = itemRepository.findByTitleContaining(
                    PageRequest.of(page, size, Sort.by(sort).descending()), keyword);

            return searchItems;
        }
    }

    public Page<Item> pricefilteredItems(int low, int high, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), low, high);

            return lowSortItems;
        } else {
            Page<Item> filteredItems = itemRepository.findByPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).descending()), low, high);

            return filteredItems;
        }
    }

    public Page<Item> searchPriceFilteredItems(String keyword, int low, int high, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByTitleContainingAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), keyword, low, high);

            return lowSortItems;
        } else {
            Page<Item> filteredItems = itemRepository.findByTitleContainingAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).descending()), keyword, low, high);

            return filteredItems;
        }
    }

    public Page<Item> searchSaleItems(String keyword, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByTitleContainingAndDiscountRateGreaterThan(
                    PageRequest.of(page, size, Sort.by(sort).ascending()),keyword, 0);

            return lowSortItems;
        } else {
            Page<Item> itemPage = itemRepository.findByTitleContainingAndDiscountRateGreaterThan(
                    PageRequest.of(page, size, Sort.by(sort).descending()),keyword, 0);

            return itemPage;
        }
    }

    public Page<Item> searchSalePriceFilteredItems(String keyword, int low, int high, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByTitleContainingAndDiscountRateGreaterThanAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), keyword, 0, low, high);

            return lowSortItems;
        } else {
            Page<Item> itemPage = itemRepository.findByTitleContainingAndDiscountRateGreaterThanAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).descending()), keyword, 0, low, high);

            return itemPage;
        }
    }

    public Page<Item> priceFilteredCategoryItems(String categoryName, int low, int high, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByCategoryNameAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName, low, high);
            return lowSortItems;
        } else {
            Page<Item> itemPage = itemRepository.findByCategoryNameAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName, low, high);
            return itemPage;
        }
    }

    public Page<Item> priceFilteredCategorySaleItems(String categoryName, int low, int high, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByCategoryNameAndSaleAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName, low, high);
            return lowSortItems;
        } else {
            Page<Item> itemPage = itemRepository.findByCategoryNameAndSaleAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName, low, high);
            return itemPage;
        }
    }

    public Page<Item> priceFilteredCategoryAndBrandItems(String categoryName, Brand brand, int low, int high, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByCategoryNameAndBrandAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName, brand, low, high);
            return lowSortItems;
        } else {
            Page<Item> itemPage = itemRepository.findByCategoryNameAndBrandAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName, brand, low, high);
            return itemPage;
        }
    }

    public Page<Item> priceFilteredCategoryAndBrandAndSaleItems(String categoryName, Brand brand, int low, int high, int page, int size, String sort) {
        if(Objects.equals(sort, "priceH")) sort = "discountPrice";
        if(Objects.equals(sort, "priceL")) {
            sort = "discountPrice";
            Page<Item> lowSortItems = itemRepository.findByCategoryNameAndBrandAndSaleAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).ascending()), categoryName, brand, low, high);
            return lowSortItems;
        } else {
            Page<Item> itemPage = itemRepository.findByCategoryNameAndBrandAndSaleAndPriceBetween(
                    PageRequest.of(page, size, Sort.by(sort).descending()), categoryName, brand, low, high);
            return itemPage;
        }
    }


    public void deleteItem(long itemId) {
        Item verifiedItem = findVerifiedItem(itemId);
        itemRepository.delete(verifiedItem);
    }

}
