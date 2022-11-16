package server.team33.cart.mapper;

import org.mapstruct.Mapper;
import server.team33.cart.dto.ItemCartDto;
import server.team33.cart.entity.ItemCart;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

@Mapper(componentModel = "spring")
public interface ItemCartMapper {

    default ItemCart itemCartPostDtoToItemCart(long itemId, UserService userService,
                                               ItemService itemService,
                                               ItemCartDto.Post itemCartPostDto) {
        User user = userService.getLoginUser();
        return ItemCart.builder()
                .quantity(itemCartPostDto.getQuantity())
                .period(itemCartPostDto.getPeriod())
                .buyNow(itemCartPostDto.isBuyNow())
                .subscription(itemCartPostDto.isSubscription())
                .item(itemService.findItem(itemId))
                .build();
        // TODO : 카트 정보 추가, 주문 정보 추가
    }

    default ItemCartDto.Response itemCartToItemCartResponseDto(ItemMapper itemMapper, ItemCart itemCart) {
        return ItemCartDto.Response.builder()
                .cartId(itemCart.getItemCartId())
                .quantity(itemCart.getQuantity())
                .period(itemCart.getPeriod())
                .buyNow(itemCart.isBuyNow())
                .subscription(itemCart.isSubscription())
//                .item(itemMapper.itemToItemResponseDto(itemCart.getItem()))
                .build();
        // TODO : 생성 시간, 업데이트 시간 추가
    }
}
