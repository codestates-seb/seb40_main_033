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
        order.setName(user.getName());
        order.setAddress(user.getAddress());
        order.setPhone(user.getPhone());
        order.setSubscription(itemOrders.get(0).isSubscription());
        order.setTotalItems(itemOrders.size());
        order.setTotalPrice(itemOrderService.countTotalPrice(itemOrders));
        order.setTotalDiscountPrice(itemOrderService.countDiscountTotalPrice(itemOrders));
        order.setExpectPrice(order.getTotalPrice() - order.getTotalDiscountPrice());
        order.setUser(user);
        order.setOrderStatus(OrderStatus.ORDER_REQUEST);

        for(ItemOrder itemOrder : itemOrders) {
            itemOrder.setOrder(order);
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
        orderRepository.save(findOrder);
    }

    public Order findOrder(long orderId) {
        Order findOrder = findVerifiedOrder(orderId);
        return findOrder;
    }

    public Page<Order> findOrders(User user, int page, boolean subscription) {
        Page<Order> findAllOrder = orderRepository.findAllByUserAndSubscription(
                PageRequest.of(page, 7, Sort.by("orderId").descending()), user, subscription);

        return findAllOrder;
    }

    public Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order findOrder = optionalOrder.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return findOrder;
    }
    public void completeOrder(Long orderId){
        Optional<Order> orderEntity = orderRepository.findById(orderId);
        orderEntity.ifPresent(order -> order.setOrderStatus(OrderStatus.ORDER_COMPLETE));
    }

    public boolean isShopper(long itemId, long userId) { // 유저의 특정 아이템 구매여부 확인
        Order order = orderRepository.findByItemAndUser(itemId, userId);
        if(order == null) return false;
        else return true;
    }

}
