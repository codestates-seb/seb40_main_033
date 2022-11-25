package server.team33.subscription.job;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;
import server.team33.order.entity.ItemOrder;
import server.team33.order.service.ItemOrderService;
import server.team33.order.service.OrderService;
import server.team33.subscription.service.SubscriptionService;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Slf4j
@RequiredArgsConstructor
@Component
public class SubscriptionJob implements Job {
    private final ItemOrderService itemOrderService;
    private final SubscriptionService subscriptionService;
    private final OrderService orderService;

    @Override
    public void execute( JobExecutionContext context ) throws JobExecutionException{

        JobDataMap mergedJobDataMap = context.getMergedJobDataMap();
        ItemOrder itemOrder = (ItemOrder) mergedJobDataMap.get("itemOrder");
        log.warn("start itemOrderId = {}", itemOrder.getItemOrderId());

        Long orderId = (Long) mergedJobDataMap.get("orderId");
        log.warn("start orderId = {}" ,orderId);
        log.error("이름 = {}",itemOrder.getItem().getTitle());

        ZonedDateTime paymentDay = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        log.warn("payment = {}", paymentDay);

        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));
        log.warn("Period = {}", itemOrder.getPeriod());
        log.info("nextDelivery = {}", nextDelivery);

        itemOrderService.setDeliveryInfo(orderId, itemOrder.getItemOrderId(), paymentDay, nextDelivery);

        subscriptionService.connectUri(nextDelivery);
    }


}
