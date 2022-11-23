package server.team33.wish.controller;


import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.response.SingleResponseDto;
import server.team33.wish.entity.Wish;
import server.team33.wish.mapper.WishMapper;
import server.team33.wish.service.WishService;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Slf4j
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class WishController {

    private final WishMapper wishMapper;
    private final WishService wishService;


//    @PostMapping("wishes/{item-id}")
//    public ResponseEntity wishItem(@PathVariable("item-id") @Positive @NotNull long itemId,
//                                   @RequestParam(value = "wish") boolean wish) {
//
//        Wish wishItem = wishService.wishItem(itemId, wish);
//
//        return new ResponseEntity<>(new SingleResponseDto<>(wishMapper.wishToWishDto(wishItem)), HttpStatus.OK);
//
//    }



}
