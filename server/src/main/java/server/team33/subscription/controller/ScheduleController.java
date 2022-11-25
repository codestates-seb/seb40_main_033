package server.team33.subscription.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.team33.order.entity.ItemOrder;
import server.team33.subscription.service.SubscriptionService;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity startsSchedule( @RequestParam(name = "orderId") Long orderId ) throws SchedulerException{

        List<ItemOrder> itemOrders = subscriptionService.getItemOrders(orderId);
        for(ItemOrder itemOrder : itemOrders){
            subscriptionService.startSchedule(orderId, itemOrder);
        }
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }


    @GetMapping("/change")
    public String changePeriod( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "itemOrderId") Long itemOrderId, @RequestParam(name = "period") Integer period ) throws SchedulerException, InterruptedException{
        subscriptionService.changePeriod(orderId, itemOrderId, period);
        return "change";
    }

    @GetMapping("/tests")
    public String sdf( @RequestParam(name = "nextDeliveryDay") String nextDeliveryDay ){
        return URLDecoder.decode(nextDeliveryDay, StandardCharsets.UTF_8);
    }

    @GetMapping("/delay")
    public String delay( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "itemOrderId") Long itemOrderId, @RequestParam(name = "delay") Integer delay ) throws SchedulerException{
        //날짜만 미루고 이 시간으로 구독 시작일을 바꾼다. 주기는 그대로라고 가정한다.
        subscriptionService.delayDelivery(orderId, itemOrderId, delay);
        return "delay";
    }

    @DeleteMapping("/cancel")
    public String delete( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "itemOrderId") Long itemOrderId ) throws SchedulerException{
        subscriptionService.cancelScheduler(orderId, itemOrderId);
        return "delete";
    }

}



