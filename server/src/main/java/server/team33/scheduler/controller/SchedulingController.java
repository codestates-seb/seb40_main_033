package server.team33.scheduler.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.service.OrderService;
import server.team33.scheduler.service.SchedulingService;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class SchedulingController {
    private final SchedulingService scheduler;
    private final OrderService orderService;

    @GetMapping
    public void startSchedule( @RequestParam(name = "orderId") Long orderId ) throws IOException{

        List<ItemOrder> itemOrders = getItemOrders(orderId);

        for(ItemOrder itemOrder : itemOrders){
            scheduler.startScheduler(orderId, itemOrder);
        }
        log.info("스케쥴러 시작했음");
    }

    @GetMapping("/change")
    public void changeSchedule( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "period") Integer period ){

        log.warn("스케쥴 변경");
        List<ItemOrder> itemOrders = getItemOrders(orderId);

        for(ItemOrder itemOrder : itemOrders){
            scheduler.changePeriod(orderId, itemOrder, period);
        }
    }

    @DeleteMapping("/cancel")
    public ResponseEntity cancelSchedule( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "itemOrderId") Long itemOrderId ){

        ItemOrder itemOrder = getItemOrder(orderId, itemOrderId);
        itemOrder.setSubscribing(false);

        scheduler.stopScheduler(orderId, itemOrderId);

        return new ResponseEntity<>(itemOrder, HttpStatus.CREATED);
    }

    @PatchMapping("/delay")
    public void delayDelivery( @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "itemOrderId") Long itemOrderId,
                               @RequestParam("delay") String delay ){

        ItemOrder itemOrder = getItemOrder(orderId, itemOrderId);

        scheduler.delayDelivery(orderId, itemOrder, delay);
    }
    @GetMapping("/tests")
    public String sdf( @RequestParam(name = "nextDeliveryDay") String nextDeliveryDay){
        return URLDecoder.decode(nextDeliveryDay, StandardCharsets.UTF_8);
    }
    private List<ItemOrder> getItemOrders( Long orderId ){
        Order order = orderService.findOrder(orderId);
        return order.getItemOrders();
    }
    private ItemOrder getItemOrder( Long orderId, Long itemOrderId ){
        Order order = orderService.findOrder(orderId);
        return order.getItemOrders().get((int) ( itemOrderId - 1 ));
    }
}
