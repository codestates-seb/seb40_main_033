package server.team33.order.mapper;

import org.mapstruct.Mapper;
import server.team33.cart.entity.ItemCart;
import server.team33.cart.service.ItemCartService;
import server.team33.item.entity.Item;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.order.dto.ItemOrderDto;
import server.team33.order.entity.ItemOrder;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemOrderMapper {

    default ItemOrder itemOrderPostDtoToItemOrder(ItemOrderDto.Post itemOrderPostDto,
                                                  ItemService itemService) {

        ItemOrder itemOrder = new ItemOrder();
        itemOrder.setQuantity(itemOrderPostDto.getQuantity());
        itemOrder.setPeriod(itemOrderPostDto.getPeriod());
        itemOrder.setSubscription(itemOrderPostDto.isSubscription());

        Item item = itemService.findVerifiedItem(itemOrderPostDto.getItemId());
        itemOrder.setItem(item);

        return itemOrder;
    }

    default ItemOrder itemCartToItemOrder(ItemCart itemCart) { // 장바구니를 불러와서 주문으로 변환
        ItemOrder itemOrder = new ItemOrder();
        itemOrder.setQuantity(itemCart.getQuantity());
        itemOrder.setPeriod(itemCart.getPeriod());
        itemOrder.setSubscription(itemCart.isSubscription());
        itemOrder.setItem(itemCart.getItem());

        return itemOrder;
    }

    default List<ItemOrder> itemCartsToItemOrders(List<ItemCart> itemCarts, ItemCartService itemCartService) {

        if(itemCarts == null) return null;

        List<ItemOrder> itemOrders = new ArrayList<>();

        for(ItemCart itemCart : itemCarts) {
            itemOrders.add(itemCartToItemOrder(itemCart));
            itemCartService.deleteItemCart(itemCart.getItemCartId());
        }

        return itemOrders;
    }

    default ItemOrderDto.SimpleResponse itemOrderToItemOrderSimpleResponseDto(
            ItemOrder itemOrder, ItemMapper itemMapper){

        ItemOrderDto.SimpleResponse itemOrderSimpleResponseDto = new ItemOrderDto.SimpleResponse();
        itemOrderSimpleResponseDto.setItemOrderId(itemOrder.getItemOrderId());
        itemOrderSimpleResponseDto.setQuantity(itemOrder.getQuantity());
        itemOrderSimpleResponseDto.setPeriod(itemOrder.getPeriod());
        itemOrderSimpleResponseDto.setSubscription(itemOrder.isSubscription());

        Item item = itemOrder.getItem();
        itemOrderSimpleResponseDto.setItem(itemMapper.itemToItemSimpleResponseDto(item));

        itemOrderSimpleResponseDto.setCreatedAt(itemOrder.getCreatedAt());
        itemOrderSimpleResponseDto.setUpdatedAt(itemOrder.getUpdatedAt());

        return itemOrderSimpleResponseDto;
    }

    default List<ItemOrderDto.SimpleResponse> itemOrdersToItemOrderSimpleResponseDtos(
            List<ItemOrder> itemOrders, ItemMapper itemMapper) {
        if(itemOrders == null) return null;

        List<ItemOrderDto.SimpleResponse> itemOrderSimpleResponseDtos = new ArrayList<>();

        for(ItemOrder itemOrder : itemOrders) {
            itemOrderSimpleResponseDtos.add(itemOrderToItemOrderSimpleResponseDto(itemOrder, itemMapper));
        }

        return itemOrderSimpleResponseDtos;
    }
}