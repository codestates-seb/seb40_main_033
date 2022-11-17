package server.team33.cart.mapper;

import org.mapstruct.Mapper;
import server.team33.cart.dto.CartResponseDto;
import server.team33.cart.entity.Cart;
import server.team33.cart.entity.ItemCart;
import server.team33.cart.service.CartService;
import server.team33.cart.service.ItemCartService;
import server.team33.item.mapper.ItemMapper;
import server.team33.response.MultiResponseDto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {

    default CartResponseDto cartToCartResponseDto(Cart cart, CartService cartService,
                                                  boolean subscription,
                                                  ItemCartService itemCartService,
                                                  ItemMapper itemMapper,
                                                  ItemCartMapper itemCartMapper) {
        CartResponseDto cartResponseDto = new CartResponseDto();
        cartResponseDto.setCartId(cart.getCartId());
        cartResponseDto.setSubscription(subscription);

        List<ItemCart> itemCarts = itemCartService.findItemCarts(cart, subscription);

        itemCartMapper.itemCartsToItemCartResponseDtos(itemMapper, itemCarts);
        cartResponseDto.setItemCartResponses(new MultiResponseDto<>(
                itemCartMapper.itemCartsToItemCartResponseDtos(itemMapper, itemCarts)));

        if(subscription) {
            cartResponseDto.setTotalPrice(cart.getSubTotalPrice());
            cartResponseDto.setTotalItems(cart.getSubTotalItems());

        } else {
            cartResponseDto.setTotalPrice(cart.getTotalPrice());
            cartResponseDto.setTotalItems(cart.getTotalItems());
        }

        cartResponseDto.setTotalDiscountPrice(cartService.countTotalDiscountPrice(cart.getCartId(), subscription));
        cartResponseDto.setExpectPrice(cartResponseDto.getTotalPrice() - cartResponseDto.getTotalDiscountPrice());

        return cartResponseDto;
    }
}
