package server.team33.order.mapper;

import org.mapstruct.Mapper;
import server.team33.item.entity.Item;
import server.team33.item.mapper.ItemMapper;
import server.team33.order.dto.OrderDto;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.response.MultiResponseDto;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

//    default Order orderPostDtoToOrder(UserService userService, OrderDto.Post orderPostDto) {
//
//        Order order = new Order();
//
//        User user = userService.getLoginUser(); // 이름, 주소, 번호는 유저 정보에서 기본값을 불러옴
//        order.setName(user.getName());
//        order.setAddress(user.getAddress());
//        order.setPhone(user.getPhone());
//
//        order.setSubscription(orderPostDto.isSubscription());
//
//        return order;
//    }

    default OrderDto.SimpleResponse orderToOrderSimpleResponseDto(Order order, ItemMapper itemMapper) {

        OrderDto.SimpleResponse orderSimpleResponseDto = new OrderDto.SimpleResponse();
        orderSimpleResponseDto.setOrderId(order.getOrderId());
        orderSimpleResponseDto.setOrderStatus(order.getOrderStatus());
        orderSimpleResponseDto.setTotalItems(order.getTotalItems());
        orderSimpleResponseDto.setExpectPrice(order.getExpectPrice());
        orderSimpleResponseDto.setSubscription(order.isSubscription());

        // 한 건의 주문에 여러 건의 아이템의 포함되어 있어도, 첫번째 제품의 정보를 사용함.
        Item item = order.getItemOrders().get(0).getItem();
        orderSimpleResponseDto.setItem(itemMapper.itemToItemSimpleResponseDto(item));
        orderSimpleResponseDto.setCreatedAt(order.getCreatedAt());
        orderSimpleResponseDto.setUpdatedAt(order.getUpdatedAt());

        return orderSimpleResponseDto;
    }

    default List<OrderDto.SimpleResponse> ordersToOrderSimpleResponseDtos(List<Order> orders, ItemMapper itemMapper) {
        if(orders == null) return null;

        List<OrderDto.SimpleResponse> orderSimpleResponseDtos = new ArrayList<>(orders.size());

        for(Order order : orders) {
            orderSimpleResponseDtos.add(orderToOrderSimpleResponseDto(order, itemMapper));
        }

        return orderSimpleResponseDtos;
    }

    default OrderDto.DetailResponse orderToOrderDetailResponseDto(Order order, ItemMapper itemMapper,
                                                                  ItemOrderMapper itemOrderMapper) {

        OrderDto.DetailResponse orderDetailResponseDto = new OrderDto.DetailResponse();
        orderDetailResponseDto.setOrderId(order.getOrderId());
        orderDetailResponseDto.setName(order.getName());
        orderDetailResponseDto.setAddress(order.getAddress());
        orderDetailResponseDto.setDetailAddress(order.getDetailAddress());
        orderDetailResponseDto.setPhone(order.getPhone());
        orderDetailResponseDto.setTotalItems(order.getTotalItems());
        orderDetailResponseDto.setTotalPrice(order.getTotalPrice());
        orderDetailResponseDto.setTotalDiscountPrice(order.getTotalDiscountPrice());
        orderDetailResponseDto.setExpectPrice(order.getExpectPrice());
        orderDetailResponseDto.setExpectPrice(order.getExpectPrice());
        orderDetailResponseDto.setSubscription(order.isSubscription());

        List<ItemOrder> itemOrders = order.getItemOrders();

        orderDetailResponseDto.setItemOrders(new MultiResponseDto<>(
                itemOrderMapper.itemOrdersToItemOrderSimpleResponseDtos(itemOrders, itemMapper)));

        orderDetailResponseDto.setOrderStatus(order.getOrderStatus());
        orderDetailResponseDto.setCreatedAt(order.getCreatedAt());
        orderDetailResponseDto.setUpdatedAt(order.getUpdatedAt());

        orderDetailResponseDto.setTotalQuantity(order.getTotalQuantity());

        return orderDetailResponseDto;
    }
}
