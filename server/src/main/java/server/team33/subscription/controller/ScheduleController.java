package server.team33.subscription.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.team33.item.mapper.ItemMapper;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.mapper.ItemOrderMapper;
import server.team33.order.service.ItemOrderService;
import server.team33.order.service.OrderService;
import server.team33.response.SingleResponseDto;
import server.team33.subscription.service.SubscriptionService;

import java.time.ZonedDateTime;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final SubscriptionService subscriptionService;
    private final OrderService orderService;
    private final ItemOrderService itemOrderService;

    private final ItemOrderMapper itemOrderMapper;
    private final ItemMapper itemMapper;

    @GetMapping("/kakao")
    public ResponseEntity startsKakaoSchedule( @RequestParam(name = "orderId") Long orderId ) throws SchedulerException{

        List<ItemOrder> itemOrders = subscriptionService.getItemOrders(orderId);
        for(ItemOrder io : itemOrders){
            Order order = orderService.findOrder(orderId);
            String nextDelivery = String.valueOf(order.getCreatedAt().plusDays(io.getPeriod()));
            ItemOrder itemOrder = itemOrderService.setDeliveryInfo(orderId, order.getCreatedAt(), nextDelivery);
            subscriptionService.startSchedule(orderId, itemOrder);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

//    @GetMapping("/general")
//    public ResponseEntity startsGeneralSchedule( @RequestParam(name = "orderId") Long orderId ) throws SchedulerException{
//
//        List<ItemOrder> itemOrders = subscriptionService.getItemOrders(orderId);
//        for(ItemOrder itemOrder : itemOrders){
//            subscriptionService.startSchedule(orderId, itemOrder);
//        }
//        return new ResponseEntity<>(HttpStatus.ACCEPTED);
//    }

    @PatchMapping("/change")
    public ResponseEntity changePeriod(
            @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "period") Integer period ) throws SchedulerException, InterruptedException{
        ItemOrder itemOrder = subscriptionService.changePeriod(orderId, period);
        return new ResponseEntity<>(new SingleResponseDto<>(itemOrderMapper.itemOrderToSubResponse(itemOrder, itemMapper)), HttpStatus.OK);
    }

    @PatchMapping("/delay")
    public ResponseEntity delay( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "delay") Integer delay ) throws SchedulerException{
        ItemOrder itemOrder = subscriptionService.delayDelivery(orderId, delay);
        return new ResponseEntity<>(new SingleResponseDto<>(itemOrderMapper.itemOrderToSubResponse(itemOrder, itemMapper)), HttpStatus.OK);
    }

    @DeleteMapping("/cancel")
    public ZonedDateTime delete( @RequestParam(name = "orderId") Long orderId ) throws SchedulerException{
        subscriptionService.cancelScheduler(orderId);
        return ZonedDateTime.now();
    }

}



