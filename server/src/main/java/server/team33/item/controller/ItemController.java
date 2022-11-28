package server.team33.item.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.item.dto.ItemDto;
import server.team33.item.entity.Item;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.response.MultiResponseDto;
import server.team33.response.SingleResponseDto;
import server.team33.review.mapper.ReviewMapper;
import server.team33.review.service.ReviewService;
import server.team33.talk.mapper.TalkMapper;
import server.team33.talk.service.TalkService;

import javax.validation.constraints.Positive;
import java.util.List;


@Slf4j
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    private final ItemMapper mapper;
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final TalkService talkService;
    private final TalkMapper talkMapper;

    @PostMapping("/items")
    public ResponseEntity postItem(@RequestBody ItemDto.post post) { // 아이템 등록을 위한 컨트롤러
        Item item = mapper.itemPostDtoToItem(post);
        log.info("item = {}",item);
        Item result = itemService.createItem(mapper.itemPostDtoToItem(post));
        return new ResponseEntity(new SingleResponseDto<>(mapper.itemToItemDetailResponseDto(result)), HttpStatus.OK);
    }

    @GetMapping("/items/{item-id}")
    public ResponseEntity getItem(@PathVariable("item-id") long itemId,
                                  @RequestParam(value="reviewPage", defaultValue="1") int reviewPage,
                                  @RequestParam(value="talkPage", defaultValue="1") int talkPage) {
        Item item = itemService.findItem(itemId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.itemToItemDetailResponseDto(
                item, reviewService, reviewMapper, talkService, talkMapper, reviewPage-1, 3, talkPage-1, 2)), HttpStatus.OK);
    }



    @GetMapping("/main") // 메인화면에서 best 제품 9개 , 할인제품 9개 조회하기
    public ResponseEntity getMainItem() {
        return new ResponseEntity(new SingleResponseDto<>(mapper.itemToItemMainTop9ResponseDto(itemService)), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchItems(@RequestParam("keyword") String keyword,
                                      @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                      @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                      @RequestParam(value = "sort", defaultValue = "sales") String sort) { // 키워드 검색
        Page<Item> itemPage = itemService.searchItems(keyword, page-1, size, sort);
        List<Item> itemList = itemPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(mapper.itemsToItemCategoryResponseDto(itemList), itemPage), HttpStatus.OK);
    }

    @GetMapping("/price")
    public ResponseEntity priceFilteredItems(@RequestParam("low") int low, @RequestParam("high") int high,
                                             @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                             @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                             @RequestParam(value = "sort", defaultValue = "sales") String sort) { // 가격 필터
        Page<Item> itemPage = itemService.pricefilteredItems(low, high, page-1, size, sort);
        List<Item> itemList = itemPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(mapper.itemsToItemCategoryResponseDto(itemList), itemPage), HttpStatus.OK);
    }

    @GetMapping("/search/price")
    public ResponseEntity searchPriceFilteredItems(@RequestParam("keyword") String keyword, @RequestParam("low") int low, @RequestParam("high") int high,
                                                   @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                   @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                                   @RequestParam(value = "sort", defaultValue = "sales") String sort) { // 키워드 검색 + 가격 필터
        Page<Item> itemPage = itemService.searchPriceFilteredItems(keyword, low, high, page-1, size, sort);
        List<Item> itemList = itemPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(mapper.itemsToItemCategoryResponseDto(itemList), itemPage), HttpStatus.OK);
    }

    @GetMapping("/search/sale")
    public ResponseEntity searchSaleItems(@RequestParam("keyword") String keyword,
                                          @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                          @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                          @RequestParam(value = "sort", defaultValue = "sales") String sort) { // 키워드 검색 + 세일
        Page<Item> itemPage = itemService.searchSaleItems(keyword, page-1, size, sort);
        List<Item> itemList = itemPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.itemsToItemCategoryResponseDto(itemList), itemPage), HttpStatus.OK);
    }

    @GetMapping("/search/sale/price")
    public ResponseEntity searchSalePriceFilteredItems(@RequestParam("keyword") String keyword, @RequestParam("low") int low, @RequestParam("high") int high,
                                                       @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                       @Positive @RequestParam(value = "size", defaultValue = "16") int size,
                                                       @RequestParam(value = "sort", defaultValue = "sales") String sort) { // 키워드 검색 + 세일 + 가격 필터
        Page<Item> itemPage = itemService.searchSalePriceFilteredItems(keyword, low, high, page-1, size, sort);
        List<Item> itemList = itemPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.itemsToItemCategoryResponseDto(itemList), itemPage), HttpStatus.OK);
    }

}

