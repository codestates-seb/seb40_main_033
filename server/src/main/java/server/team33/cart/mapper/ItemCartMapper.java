package server.team33.cart.mapper;

import org.mapstruct.Mapper;
import server.team33.cart.dto.ItemCartDto;
import server.team33.cart.entity.ItemCart;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

import java.util.ArrayList;
import java.util.List;

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
//                .cart(user.getCart())
                .item(itemService.findItem(itemId))
                .build();
        // TODO : 유저 정보 추가
    }

    default ItemCartDto.Response itemCartToItemCartResponseDto(ItemMapper itemMapper, ItemCart itemCart) {
        return ItemCartDto.Response.builder()
                .cartId(itemCart.getItemCartId())
                .quantity(itemCart.getQuantity())
                .period(itemCart.getPeriod())
                .buyNow(itemCart.isBuyNow())
                .subscription(itemCart.isSubscription())
//                .item(itemMapper.itemToItemResponseDto(itemCart.getItem()))
//                .createdAt(itemCart.getCreatedAt())
//                .updatedAt(itemCart.getUpdatedAt())
                .build();
        // TODO : 간소화된 itemResponseDto 적용 필요
    }

    default List<ItemCartDto.Response> itemCartsToItemCartResponseDtos(ItemMapper itemMapper, List<ItemCart> itemCarts) {
        if(itemCarts == null) return null;

        List<ItemCartDto.Response> itemCartResponseDtos = new ArrayList<>(itemCarts.size());

        for(ItemCart itemCart : itemCarts) {
            itemCartResponseDtos.add(itemCartToItemCartResponseDto(itemMapper, itemCart));
        }

        return itemCartResponseDtos;
    }
}
