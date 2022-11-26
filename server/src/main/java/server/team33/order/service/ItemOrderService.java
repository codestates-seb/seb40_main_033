package server.team33.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.item.repository.ItemRepository;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.reposiroty.ItemOrderRepository;
import server.team33.order.reposiroty.OrderRepository;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ItemOrderService {

    private final ItemOrderRepository itemOrderRepository;
    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;

    public List<ItemOrder> createItemOrder( ItemOrder itemOrder ){
        itemOrderRepository.save(itemOrder);
        List<ItemOrder> itemOrders = new ArrayList<>();
        itemOrders.add(itemOrder);

        return itemOrders;
    }

    public int countTotalPrice( List<ItemOrder> itemOrders ){

        if(itemOrders == null) return 0;

        int totalPrice = 0;

        for(ItemOrder itemOrder : itemOrders){
            int quantity = itemOrder.getQuantity();
            int price = itemOrder.getItem().getPrice();
            totalPrice += ( quantity * price );
        }

        return totalPrice;
    }

    public int countDiscountTotalPrice( List<ItemOrder> itemOrders ){

        if(itemOrders == null) return 0;

        int totalDiscountPrice = 0;

        for(ItemOrder itemOrder : itemOrders){
            int quantity = itemOrder.getQuantity();
            int price = itemOrder.getItem().getPrice();
            int discountRate = itemOrder.getItem().getDiscountRate();
            totalDiscountPrice += ( quantity * price * discountRate / 100 );
        }

        return totalDiscountPrice;
    }

    public int countQuantity( List<ItemOrder> itemOrders ){ // 주문의 담긴 상품의 총량을 구하는 메서드

        if(itemOrders == null) return 0;

        int totalquantity = 0;

        for(ItemOrder itemOrder : itemOrders){
            int quantity = itemOrder.getQuantity();
            totalquantity += quantity;
        }

        return totalquantity;
    }
    public void minusSales(List<ItemOrder> itemOrders) { // 주문 취소할 경우 아이템 판매량에서 제외

        for(ItemOrder itemOrder : itemOrders) {
            int sales = itemOrder.getQuantity();
            itemOrder.getItem().setSales(itemOrder.getItem().getSales() - sales);
            itemRepository.save(itemOrder.getItem());
        }
    }

    public void plusSales(ItemOrder itemOrder) { // 주문 요청할 경우 아이템 판매량 증가

        int sales = itemOrder.getQuantity();
        itemOrder.getItem().setSales(itemOrder.getItem().getSales() + sales);
        itemRepository.save(itemOrder.getItem());
    }

    synchronized public ItemOrder setItemPeriod( Long orderId, Long itemOrderId, Integer period ){

        Optional<Order> order = orderRepository.findById(orderId);

        if(order.isPresent()){
            ItemOrder itemOrder = order.get().getItemOrders().get((int) ( itemOrderId - 1 ));
            itemOrder.setPeriod(period);
            log.error("주기변경 = {}", itemOrder.getPeriod());
            return itemOrder;
        }
        throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
    }

    synchronized public ItemOrder delayDelivery( Long orderId, Long itemOrderId, Integer delay ){

        Optional<Order> order = orderRepository.findById(orderId);

        if(order.isPresent()){
            ItemOrder itemOrder = order.get().getItemOrders().get((int) (itemOrderId- 1));
            ZonedDateTime nextDelivery = itemOrder.getNextDelivery().plusDays(delay);
            itemOrder.setNextDelivery(nextDelivery);
        return itemOrder;
        }
        throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
    }

    synchronized public void setDeliveryInfo( Long orderId, Long itemOrderId, ZonedDateTime paymentDay, String nextDelivery ){

        Optional<Order> order = orderRepository.findById(orderId);

        if(order.isPresent()){
            ItemOrder itemOrder = order.get().getItemOrders().get((int) ( itemOrderId - 1 ));
            itemOrder.setNextDelivery(ZonedDateTime.parse(nextDelivery));
            itemOrder.setPaymentDay(paymentDay);
            log.info("딜리버리정보 = {}", itemOrder.getPaymentDay());
            log.info("딜리버리정보 = {}", itemOrder.getNextDelivery());
        }


    }
}