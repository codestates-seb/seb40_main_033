package server.team33.category.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.category.dto.CategoryDto;
import server.team33.category.entity.Category;
import server.team33.category.mapper.CategoryMapper;
import server.team33.category.service.CategoryService;
import server.team33.item.dto.ItemDto;
import server.team33.item.entity.Item;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.repository.ItemRepository;
import server.team33.response.SingleResponseDto;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class ItemCategoryController {

    private final CategoryService categoryService;
    private final ItemRepository itemRepository;
    private final CategoryMapper categoryMapper;
    private final ItemMapper itemMapper;



    @PostMapping
    public ResponseEntity postCategory(@RequestBody CategoryDto.Post post) {
        Category result = categoryService.createCategory(categoryMapper.categoryPostDtoToCategory(post));
        categoryService.verifyExistCategory(post.getCategoryName());
        return new ResponseEntity(new SingleResponseDto<>(categoryMapper.categoryToCategoryResponseDto(result)), HttpStatus.OK);
    }



    @GetMapping
    public ResponseEntity getCategoryItems(@RequestParam("categoryName") String categoryName) { // 카테고리별 아이템 목록 조회
        categoryService.verifyExistCategory(categoryName);
        Long categoryId = categoryService.findCategoryId(categoryName);
        List<Item> allByCategories = itemRepository.findAllByCategoryId(categoryId);
        List<ItemDto.ItemCategoryResponse> lists = allByCategories.stream().map(item -> itemMapper.itemToItemCategoryResponseDto(item)).collect(Collectors.toList());
        return new ResponseEntity(new SingleResponseDto<>(lists), HttpStatus.OK);
    }


//    @GetMapping
//    public ResponseEntity getCategoryBrandItems(@RequestParam("categoryName") String categoryName, @RequestParam("brand") String brand) { // 카테고리별 브랜드별 아이템 목록 조회
//        itemService.verifyExistBrand(brand);
//        List<Item> allCategoryNameAndBrands = itemRepository.findAllCategoryNameAndBrand(categoryName, brand);
//        List<ItemDto.ItemCategoryResponse> lists = allCategoryNameAndBrands.stream().map(item -> itemMapper.itemToItemCategoryResponseDto(item)).collect(Collectors.toList());
//        return new ResponseEntity(new SingleResponseDto<>(lists), HttpStatus.OK);
//    }
//
//
//    @GetMapping
//    public ResponseEntity getCategorySaleItems(@RequestParam("categoryName") String categoryName) { // 카테고리별 할인제품 모아보기
//        categoryService.verifyExistCategory(categoryName);
//        List<Item> allCategoryNameSaleItems = itemRepository.findAllCategoryNameSaleItem(categoryName);
//        List<ItemDto.ItemCategoryResponse> lists = allCategoryNameSaleItems.stream().map(item -> itemMapper.itemToItemCategoryResponseDto(item)).collect(Collectors.toList());
//        return new ResponseEntity(new SingleResponseDto<>(lists), HttpStatus.OK);
//    }




}
