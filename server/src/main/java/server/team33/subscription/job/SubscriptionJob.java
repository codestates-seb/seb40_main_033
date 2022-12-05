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
import server.team33.subscription.service.SubscriptionService;
import server.team33.user.entity.User;

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
    private final SubscriptionService subscriptionService;

    @Override
    public void execute( JobExecutionContext context ) throws JobExecutionException{

        JobDataMap mergedJobDataMap = context.getMergedJobDataMap();

        ItemOrder itemOrder = (ItemOrder) mergedJobDataMap.get("itemOrder");
        log.info("start itemOrderId = {}", itemOrder.getItemOrderId());
        log.info("itemOrder title = {}", itemOrder.getItem().getTitle());

        ZonedDateTime paymentDay = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        log.info("payment = {}", paymentDay);

        Long orderId = (Long) mergedJobDataMap.get("orderId");
        log.info("start orderId = {}", orderId);
        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));
        itemOrderService.setDeliveryInfo(orderId, paymentDay, nextDelivery, itemOrder);

        Order newOrder = getNewOrder(orderId);
        log.info("newOrder Id = {}", newOrder.getOrderId());
        ItemOrder newItemOrder = itemOrderService.itemOrderCopy(orderId, newOrder, itemOrder);

        JobDetail newJob = updateJob(itemOrder, orderId, newOrder, newItemOrder);
        try{
            scheduler.addJob(newJob, true);
        } catch(SchedulerException e){
            throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
        }

        connectAutoPay(newOrder.getOrderId());
    }

    private Order getNewOrder( Long orderId ){
        orderService.completeOrder(orderId);
        Order order = orderService.findOrder(orderId);
        return orderService.deepCopy(order);
    }

    private JobDetail updateJob( ItemOrder itemOrder, Long orderId, Order newOrder, ItemOrder newItemOrder ){
        User user = subscriptionService.getUser(orderId);
        JobKey jobkey = jobKey(user.getUserId() + itemOrder.getItem().getTitle(), String.valueOf(user.getUserId()));
        return jobDetail.buildJobDetail(jobkey, newOrder.getOrderId(), newItemOrder);
    }

    private void connectAutoPay( Long orderId ){

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("orderId", String.valueOf(orderId));

        URI uri = UriComponentsBuilder.newInstance().scheme("http").host("ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com").port(8080) // 호스트랑 포트는 나중에 변경해야한다.
                .path("/payments/subscription").queryParams(parameters).build().toUri();
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(uri, String.class);
    }


}
