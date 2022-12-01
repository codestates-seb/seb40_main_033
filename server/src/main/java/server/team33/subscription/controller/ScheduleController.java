package server.team33.subscription.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.team33.order.entity.ItemOrder;
import server.team33.subscription.service.SubscriptionService;

import java.time.ZonedDateTime;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final SubscriptionService subscriptionService;

    @GetMapping("/kakao")
    public ResponseEntity startsKakaoSchedule( @RequestParam(name = "orderId") Long orderId ) throws SchedulerException{

        List<ItemOrder> itemOrders = subscriptionService.getItemOrders(orderId);
        for(ItemOrder itemOrder : itemOrders){
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
    public ZonedDateTime changePeriod(
            @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "period") Integer period ) throws SchedulerException, InterruptedException{
        return subscriptionService.changePeriod(orderId, period);
    }

    @PatchMapping("/delay")
    public ZonedDateTime delay( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "delay") Integer delay ) throws SchedulerException{
        return subscriptionService.delayDelivery(orderId, delay);
    }

    @DeleteMapping("/cancel")
    public ZonedDateTime delete( @RequestParam(name = "orderId") Long orderId ) throws SchedulerException{
        subscriptionService.cancelScheduler(orderId);
        return ZonedDateTime.now();
    }

}



