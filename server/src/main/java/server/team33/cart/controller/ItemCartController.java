package server.team33.cart.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.cart.dto.ItemCartDto;
import server.team33.cart.entity.ItemCart;
import server.team33.cart.mapper.ItemCartMapper;
import server.team33.cart.service.CartService;
import server.team33.cart.service.ItemCartService;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.response.SingleResponseDto;
import server.team33.user.mapper.UserMapper;
import server.team33.user.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/carts")
public class ItemCartController {

    private final ItemCartService itemCartService;
    private final ItemCartMapper itemCartMapper;
    private final ItemMapper itemMapper;
    private final ItemService itemService;
    private final CartService cartService;
    private final UserService userService;

    @PostMapping("/{item-id}")
    public ResponseEntity postItemCart(@Valid @RequestBody ItemCartDto.Post itemCartPostDto,
        @PathVariable("item-id") @Positive long itemId) {

        ItemCart itemCart = itemCartService.addItemCart(itemCartMapper.
                itemCartPostDtoToItemCart(itemId, userService, itemService, itemCartPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(itemCartMapper.itemCartToItemCartResponseDto(
                        itemMapper, itemCart)), HttpStatus.CREATED);
    }

    @PatchMapping("/itemcarts/{itemcart-id}")
    public ResponseEntity upDownItemCart(@PathVariable("itemcart-id") @Positive long itemCartId,
                                          @RequestParam(value="upDown") int upDown) {
        ItemCart itemCart = itemCartService.findItemCart(itemCartId);
        ItemCart upDownItemCart = itemCartService.updateItemCart(itemCart, upDown);
        cartService.refreshCart(upDownItemCart.getCart().getCartId(), upDownItemCart.isSubscription());

        return new ResponseEntity<>(
                new SingleResponseDto<>(itemCartMapper.itemCartToItemCartResponseDto(
                        itemMapper, upDownItemCart)), HttpStatus.CREATED);
    }

    @DeleteMapping("/{cart-id}/itemCarts") // 장바구니에서 특정 아이템 삭제
    public ResponseEntity deleteItemCart(@PathVariable("cart-id") @Positive long cartId,
                                         @RequestParam("itemCart-id") @Positive long itemCartId) {
        itemCartService.deleteItemCart(itemCartId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

//    @DeleteMapping("/order/{order-id}")
//    public ResponseEntity emptyItemCart(@PathVariable("order-id") @Positive long orderId) {
//
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }
//    TODO : orderDto 를 body 로 받아서 로직 구현
}
