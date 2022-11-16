package server.team33.cart.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.cart.dto.ItemCartDto;
import server.team33.cart.entity.Cart;
import server.team33.cart.entity.ItemCart;
import server.team33.cart.mapper.ItemCartMapper;
import server.team33.cart.service.CartService;
import server.team33.cart.service.ItemCartService;
import server.team33.item.service.ItemService;
import server.team33.response.MultiResponseDto;
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
    private final ItemService itemService;
    private final CartService cartService;
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/{item-id}")
    public ResponseEntity postItemCart(@Valid @RequestBody ItemCartDto.Post itemCartPostDto,
        @PathVariable("item-id") @Positive long itemId) {

        ItemCart itemCart = itemCartService.addItemCart(itemCartMapper.
                itemCartPostDtoToItemCart(itemId, userService, itemService, itemCartPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(itemCartMapper), HttpStatus.CREATED);
    }

    @GetMapping("/{cart-id}")
    public void getItemCarts(@PathVariable("cart-id") @Positive long cartId,
                                       @RequestParam(value="subscription", defaultValue="false") boolean subscription) {
        Cart cart = cartService.findCart(cartId);
        itemCartService.findItemCarts(cart, subscription);
        // TODO : responseDtos mapper 구현
//        return new ResponseEntity<>(new MultiResponseDto<>(itemCartMapper.itemCartsToItemCartResponseDtos()), HttpStatus.OK);

    }

    @DeleteMapping("/{cart-id}/itemCarts/{itemCart-id}")
    public ResponseEntity deleteItemCart(@PathVariable("cart-id") @Positive long cartId,
                                         @PathVariable("itemCart-id") @Positive long itemCartId) {
        // TODO : 본인 확인 후 삭제 권한 부여
        itemCartService.deleteItemCart(itemCartId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
