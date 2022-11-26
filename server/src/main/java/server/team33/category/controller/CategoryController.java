package server.team33.category.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.category.dto.CategoryDto;
import server.team33.category.entity.Category;
import server.team33.category.mapper.CategoryMapper;
import server.team33.category.service.CategoryService;
import server.team33.item.entity.Brand;
import server.team33.item.entity.Item;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.response.MultiResponseDto;
import server.team33.response.SingleResponseDto;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    private final ItemMapper itemMapper;
    private final ItemService itemService;




    @PostMapping
    public ResponseEntity postCategory(@RequestBody CategoryDto.Post post) {
        Category result = categoryService.createCategory(categoryMapper.categoryPostDtoToCategory(post));
        categoryService.verifyExistCategory(post.getCategoryName());
        return new ResponseEntity(new SingleResponseDto<>(categoryMapper.categoryToCategoryResponseDto(result)), HttpStatus.OK);
    }



    @GetMapping
    public ResponseEntity getCategoryItems(@RequestParam("categoryName") String categoryName,
                                           @Positive @RequestParam(value="page", defaultValue="1") int page,
                                           @Positive @RequestParam(value="size", defaultValue="16") int size,
                                           @RequestParam(value="sort", defaultValue="itemId") String sort) { // 카테고리별 아이템 목록 조회

        Page<Item> pageItems = itemService.findItems(categoryName, page-1, size, sort);
        List<Item> items = pageItems.getContent();

        return new ResponseEntity(new MultiResponseDto<>(itemMapper.itemsToItemCategoryResponseDto(items), pageItems), HttpStatus.OK);
    }


    @GetMapping("/brand")
    public ResponseEntity getCategoryBrandItems(@RequestParam("categoryName") String categoryName,
                                                @RequestParam("brand") Brand brand,
                                                @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                                @RequestParam(value = "sort", defaultValue = "itemId") String sort) { // 카테고리별 브랜드별 아이템 목록 조회

        Page<Item> pageBrandItems = itemService.findBrandItems(categoryName, brand, page - 1, size, sort);
        List<Item> brandItems = pageBrandItems.getContent();
        return new ResponseEntity(new MultiResponseDto<>(itemMapper.itemsToItemCategoryResponseDto(brandItems), pageBrandItems), HttpStatus.OK);
    }



    @GetMapping("/sale")
    public ResponseEntity getCategorySaleItems(@RequestParam("categoryName") String categoryName,
                                               @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                               @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                               @RequestParam(value = "sort", defaultValue = "itemId") String sort
                                              ) { // 카테고리별 할인제품 모아보기
        Page<Item> pageSaleItems = itemService.findSaleItems(categoryName, page - 1, size, sort);
        List<Item> saleItems = pageSaleItems.getContent();
        return new ResponseEntity(new MultiResponseDto<>(itemMapper.itemsToItemCategoryResponseDto(saleItems), pageSaleItems), HttpStatus.OK);
    }


    @GetMapping("/brand/sale") // 카테고리별 브랜드별 할인제품 모아보기
    public ResponseEntity getCategoryBrandSaleItems(@RequestParam("categoryName") String categoryName,
                                                    @RequestParam("brand") Brand brand,
                                                    @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                    @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                                    @RequestParam(value = "sort", defaultValue = "itemId") String sort) {
        Page<Item> pageBrandSaleItems = itemService.findBrandSaleItems(categoryName, brand, page - 1, size, sort);
        List<Item> brandSaleItems = pageBrandSaleItems.getContent();
        return new ResponseEntity(new MultiResponseDto<>(itemMapper.itemsToItemCategoryResponseDto(brandSaleItems), pageBrandSaleItems), HttpStatus.OK);
    }

}
