package server.team33.subscription.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.service.ItemOrderService;
import server.team33.order.service.OrderService;
import server.team33.subscription.job.JobDetailService;
import server.team33.subscription.trigger.TriggerService;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

import static org.quartz.JobKey.jobKey;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionService {
    private final Scheduler scheduler;
    private final TriggerService trigger;
    private final JobDetailService jobDetail;
    private final OrderService orderService;
    private final ItemOrderService itemOrderService;


    public void startSchedule( Long orderId, ItemOrder itemOrder ) throws SchedulerException{

        JobKey jobkey = jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId));
        JobDetail payDay = jobDetail.buildJobDetail(jobkey, orderId, itemOrder.getItemOrderId());
        Trigger lastTrigger = trigger.buildTrigger(jobkey, orderId, itemOrder);

        Date date = scheduler.scheduleJob(payDay, lastTrigger);
        log.warn("new scheduler = {}", date);
    }

    public void changePeriod( Long orderId, Long itemOrderId, Integer period ) throws SchedulerException, InterruptedException{

        ItemOrder itemOrder = itemOrderService.setItemPeriod(orderId, itemOrderId, period);
        log.warn("주기변경후 반환된 itemOrder = {}", itemOrder.getPeriod());

        boolean noMargin = itemOrder.getPaymentDay().plusDays(period).isBefore(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))); //바궈야진
        log.warn("마진 = {}", noMargin);

        if(noMargin){
            scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));
            log.warn("스케쥴러 취소");
            log.warn("스케쥴러 다시시작");
            startSchedule(orderId, itemOrder);
        }

        extendPeriod(orderId, itemOrder);

        ZonedDateTime paymentDay = itemOrder.getPaymentDay();
        log.info("payment = {}", itemOrder.getPaymentDay());

        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));

        itemOrderService.setDeliveryInfo(orderId, itemOrder.getItemOrderId(), paymentDay, nextDelivery);

        log.info("extend nextDelivery = {}", nextDelivery);

        connectUri(nextDelivery);
    }

    private void extendPeriod( Long orderId, ItemOrder itemOrder ) throws SchedulerException, InterruptedException{
        log.warn("배달기한 늘릴 때 기한 = {}", itemOrder.getPeriod());

        scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));

        JobKey jobkey = jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId));
        JobDetail payDay = jobDetail.buildJobDetail(jobkey, orderId, itemOrder.getItemOrderId());
        Trigger changeTrigger = trigger.changeTrigger(jobkey, orderId, itemOrder);

        log.warn("구매시간 = {}", itemOrder.getPaymentDay());

        Date date = scheduler.scheduleJob(payDay, changeTrigger);
        log.warn(" extend scheduler = {}", date);
    }

    public void delayDelivery( Long orderId, Long itemOrderId, Integer delay ) throws SchedulerException{

        ItemOrder itemOrder = itemOrderService.delayDelivery(orderId, itemOrderId, delay);
        //실행일을 옮겨야됨.
        scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));

        JobKey jobkey = jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId));
        JobDetail payDay = jobDetail.buildJobDetail(jobkey, orderId, itemOrder.getItemOrderId());
        Trigger changeTrigger = trigger.delayTrigger(jobkey, orderId, itemOrder);

        Date date = scheduler.scheduleJob(payDay, changeTrigger);
        log.warn(" extend scheduler = {}", date);

        log.warn("구독 일단 정지 = {}",itemOrder.getItem().getTitle());
        connectUri(String.valueOf(itemOrder.getNextDelivery()));
    }

    public void cancelScheduler( Long orderId, Long itemOrderId ) throws SchedulerException{
        ItemOrder itemOrder = getItemOrder(orderId, itemOrderId);
        scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));
        log.warn("구독 취소 = {}",itemOrder.getItem().getTitle());
    }

    public List<ItemOrder> getItemOrders( Long orderId ){

        Order order = orderService.findOrder(orderId);
        return order.getItemOrders();
    }

    public ItemOrder getItemOrder( Long orderId, Long itemOrderId ){

        Order order = orderService.findOrder(orderId);
        ItemOrder itemOrder = order.getItemOrders().get((int) ( itemOrderId - 1 ));
        log.warn("아이템오더 아이진 = {}", itemOrder.getItemOrderId());
        return itemOrder;
    }

   synchronized public void connectUri( String nextDelivery ){
        MultiValueMap<String, String> queryParam = new LinkedMultiValueMap<>();

        String encodedNextDelivery = URLEncoder.encode(nextDelivery, StandardCharsets.UTF_8);
        log.info("encodedNextDelivery = {}", encodedNextDelivery);

        queryParam.add("nextDeliveryDay", encodedNextDelivery);
        log.info("query = {}", queryParam);

        URI uri = UriComponentsBuilder.newInstance().scheme("http").host("localhost").port(8080).path("schedule/tests") // 호스트랑 포트는 나중에 변경해야한다.
                .queryParams(queryParam).build().toUri();

        RestTemplate restTemplate = new RestTemplate();
        String forObject = restTemplate.getForObject(uri, String.class);
        log.error("result = {}", forObject);
    }

}
