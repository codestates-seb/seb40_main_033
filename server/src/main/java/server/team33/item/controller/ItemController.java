package server.team33.item.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.item.dto.ItemDto;
import server.team33.item.entity.Item;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.response.SingleResponseDto;


@Slf4j
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;
    private final ItemMapper mapper;

    @PostMapping
    public ResponseEntity postItem(@RequestBody ItemDto.post post) { // 아이템 등록을 위한 컨트롤러
        Item item = mapper.itemPostDtoToItem(post);
        log.info("item = {}",item);
        Item result = itemService.createItem(mapper.itemPostDtoToItem(post));
        return new ResponseEntity(new SingleResponseDto<>(mapper.itemToItemResponseDto(result)), HttpStatus.OK);
    }

    @GetMapping("/{item-id}")
    public ResponseEntity getItem(@PathVariable("item-id") long itemId) {
        Item item = itemService.findItem(itemId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.itemToItemDetailResponseDto(item)), HttpStatus.OK);
    }

//    @GetMapping("/main")
//    public ResponseEntity getBestAndSaleItems() { // 메인화면에서 best 제품 9개 , 할인제품 9개
//        List<Item> bestItemAnd9SaleItem = itemRepository.find9BestItemAnd9SaleItem();
//        List<ItemDto.ItemCategoryResponse> lists = bestItemAnd9SaleItem.stream().map(item -> mapper.itemToItemCategoryResponseDto(item)).collect(Collectors.toList());
//        return new ResponseEntity(new SingleResponseDto<>(lists), HttpStatus.OK);
//    }


}

