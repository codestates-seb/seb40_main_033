package server.team33.subscription.job;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.service.ItemOrderService;
import server.team33.order.service.OrderService;
import server.team33.subscription.trigger.TriggerService;

import java.net.URI;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.quartz.JobKey.jobKey;

@Slf4j
@RequiredArgsConstructor
@Component

public class SubscriptionJob implements Job {
    private final ItemOrderService itemOrderService;
    private final OrderService orderService;
    private final Scheduler scheduler;
    private final JobDetailService jobDetail;
    private final TriggerService trigger;
    @Override
    public void execute( JobExecutionContext context ) throws JobExecutionException{

        JobDataMap mergedJobDataMap = context.getMergedJobDataMap();

        ZonedDateTime paymentDay = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        log.warn("payment = {}", paymentDay);

        ItemOrder itemOrder = (ItemOrder) mergedJobDataMap.get("itemOrder");
        log.warn("start itemOrderId = {}", itemOrder.getItemOrderId());
        log.error("이름 = {}", itemOrder.getItem().getTitle());

        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));
        log.warn("Period = {}", itemOrder.getPeriod());
        log.info("nextDelivery = {}", nextDelivery);

        Long orderId = (Long) mergedJobDataMap.get("orderId");
        log.warn("start orderId = {}", orderId);
        itemOrderService.setDeliveryInfo(orderId, paymentDay, nextDelivery);

        orderService.completeOrder(orderId);
        Order order = orderService.findOrder(orderId);
        Order newOrder = orderService.deepCopy(order);
        ItemOrder newItemOrder  = itemOrderService.itemOrderCopy(orderId, newOrder);

        try{
            Thread.sleep(9000);
        } catch(InterruptedException e){
            throw new RuntimeException(e);
        }

        connectAutoPay(newOrder.getOrderId());

        try{

            scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));
            JobKey jobkey = jobKey(String.valueOf(newOrder.getOrderId()) + newItemOrder.getItemOrderId(), String.valueOf(newOrder));
            log.warn("새로운 아이템 오더 아이디 = {}",newItemOrder.getItemOrderId());
            log.warn("새로운 오더 아이디 = {}",newOrder.getOrderId());
            JobDetail payDay = jobDetail.buildJobDetail(jobkey, newOrder.getOrderId(), newItemOrder);
            Trigger oldTrigger = trigger.buildTrigger(jobkey, newOrder.getOrderId(), newItemOrder);

            scheduler.scheduleJob(payDay, oldTrigger);

        } catch(SchedulerException e){
            throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
        }

    }

    private void connectAutoPay( Long orderId ){

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("orderId", String.valueOf(orderId));

        URI uri = UriComponentsBuilder.newInstance().scheme("http").host("localhost").port(8080) // 호스트랑 포트는 나중에 변경해야한다.
                .path("/payments/subscription").queryParams(parameters).build().toUri();
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(uri, String.class);
    }


}
