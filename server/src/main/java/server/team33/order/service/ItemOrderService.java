package server.team33.order.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.order.entity.ItemOrder;
import server.team33.order.reposiroty.ItemOrderRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemOrderService {

    private final ItemOrderRepository itemOrderRepository;

    public ItemOrder createItemOrder(ItemOrder itemOrder) {
        return itemOrderRepository.save(itemOrder);
    }

    public int countTotalPrice(List<ItemOrder> itemOrders) {

        if(itemOrders == null) return 0;

        int totalPrice = 0;

        for(ItemOrder itemOrder : itemOrders) {
            int quantity = itemOrder.getQuantity();
            int price = itemOrder.getItem().getPrice();
            totalPrice += (quantity * price);
        }

        return totalPrice;
    }

    public int countDiscountTotalPrice(List<ItemOrder> itemOrders) {

        if(itemOrders == null) return 0;

        int totalDiscountPrice = 0;

        for(ItemOrder itemOrder : itemOrders) {
            int quantity = itemOrder.getQuantity();
            int price = itemOrder.getItem().getPrice();
            int discountRate = itemOrder.getItem().getDiscountRate();
            totalDiscountPrice += (quantity * price * discountRate/100);
        }

        return totalDiscountPrice;
    }

}
