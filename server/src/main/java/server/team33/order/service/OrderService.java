package server.team33.order.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.entity.OrderStatus;
import server.team33.order.reposiroty.ItemOrderRepository;
import server.team33.order.reposiroty.OrderRepository;
import server.team33.user.entity.User;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ItemOrderRepository itemOrderRepository;
    private final ItemOrderService itemOrderService;

    public Order callOrder(List<ItemOrder> itemOrders, User user) {
        Order order = new Order();
        order.setItemOrders(itemOrders);
        order.setName(user.getRealName());
        order.setAddress(user.getAddress());
        order.setDetailAddress(user.getDetailAddress());
        order.setPhone(user.getPhone());
        order.setSubscription(itemOrders.get(0).isSubscription());
        order.setTotalItems(itemOrders.size());
        order.setTotalPrice(itemOrderService.countTotalPrice(itemOrders));
        order.setTotalDiscountPrice(itemOrderService.countDiscountTotalPrice(itemOrders));
        order.setExpectPrice(order.getTotalPrice() - order.getTotalDiscountPrice());
        order.setUser(user);
        order.setOrderStatus(OrderStatus.ORDER_REQUEST);
        order.setTotalQuantity(itemOrderService.countQuantity(itemOrders));

        for(ItemOrder itemOrder : itemOrders) {
            itemOrder.setOrder(order);
            itemOrderService.plusSales(itemOrder); // 판매량 누적
            itemOrderRepository.save(itemOrder);
        }

        orderRepository.save(order);
        return order;
    }


    //    public Order createOrder(Order order) {
//        return orderRepository.save(order);
//    }

    public void cancelOrder(long orderId) {
        Order findOrder = findOrder(orderId);
        findOrder.setOrderStatus(OrderStatus.ORDER_CANCEL);
        itemOrderService.minusSales(findOrder.getItemOrders()); // 주문 취소 -> 판매량 집계에서 제외
        orderRepository.save(findOrder);
    }

    public Order findOrder(long orderId) {
        Order findOrder = findVerifiedOrder(orderId);
        return findOrder;
    }

    public Page<Order> findOrders(User user, int page, boolean subscription) {
        Page<Order> findAllOrder = orderRepository.findAllByUserAndSubscriptionAndOrderStatusNotAndOrderStatusNot(
                PageRequest.of(page, 7, Sort.by("orderId").descending()),
                user, subscription, OrderStatus.ORDER_REQUEST, OrderStatus.ORDER_SUBSCRIBE);

        return findAllOrder;
    }

    public Page<Order> findSubs(User user, int page) {
        Page<Order> findAllSubs = orderRepository.findAllByUserAndOrderStatus(
                PageRequest.of(page, 6, Sort.by("orderId").descending()), user, OrderStatus.ORDER_SUBSCRIBE);

        return findAllSubs;
    }

    public Page<ItemOrder> findAllSubs(User user, int page) {
        Page<ItemOrder> findAllSubs = itemOrderRepository.findAllSubs(
                PageRequest.of(page, 6, Sort.by("itemOrderId").descending()), OrderStatus.ORDER_SUBSCRIBE, user.getUserId());

        return findAllSubs;
    }

    public Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order findOrder = optionalOrder.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return findOrder;
    }
    public boolean isShopper(long itemId, long userId) { // 유저의 특정 아이템 구매여부 확인
        Order order = orderRepository.findByItemAndUser(itemId, userId);
        if(order == null) return false;
        else return true;
    }
    public void completeOrder( Long orderId ){
        Order order = findOrder(orderId);
        order.setOrderStatus(OrderStatus.ORDER_COMPLETE);
    }

    public void subsOrder( Long orderId ){
        Order order = findOrder(orderId);
        order.setOrderStatus(OrderStatus.ORDER_SUBSCRIBE);
    }
    public Order deepCopy(Order order){
        Order newOrder = new Order(order);
        orderRepository.save(newOrder);
        return newOrder;
    }

}
