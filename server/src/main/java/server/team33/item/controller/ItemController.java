package server.team33.item.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.team33.item.entity.Item;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.response.SingleResponseDto;

@RestController
@Slf4j
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {

    private ItemService itemService;
    private ItemMapper mapper;


    @GetMapping("/{item-id}")
    public ResponseEntity getItem(@PathVariable("item-id") long itemId) {
        Item item = itemService.findItem(itemId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.itemToItemResponseDto(item)), HttpStatus.OK);
    }



}
