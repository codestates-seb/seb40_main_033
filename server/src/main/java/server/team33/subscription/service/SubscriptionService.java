package server.team33.subscription.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.stereotype.Service;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.service.ItemOrderService;
import server.team33.order.service.OrderService;
import server.team33.subscription.job.JobDetailService;
import server.team33.subscription.trigger.TriggerService;

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
        JobDetail payDay = jobDetail.buildJobDetail(jobkey, orderId, itemOrder);
        Trigger lastTrigger = trigger.buildTrigger(jobkey, orderId, itemOrder);
        Date date = scheduler.scheduleJob(payDay, lastTrigger);
        log.warn("new scheduler = {}", date);
    }

    public void changePeriod( Long orderId, Integer period ) throws SchedulerException, InterruptedException{

        ItemOrder itemOrder = itemOrderService.setItemPeriod(orderId, period);
        log.warn("주기변경후 반환된 itemOrder = {}", itemOrder.getPeriod());

        payDirectly(orderId, period, itemOrder);

        ZonedDateTime paymentDay = itemOrder.getPaymentDay();
        log.info("payment = {}", itemOrder.getPaymentDay());

        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));

        ItemOrder itemOrder1 = itemOrderService.setDeliveryInfo(orderId, paymentDay, nextDelivery);
        log.info("extend nextDelivery = {}", nextDelivery);

        extendPeriod(orderId, itemOrder1);
    }

    private void payDirectly( Long orderId, Integer period, ItemOrder itemOrder ) throws SchedulerException{
        boolean noMargin = itemOrder.getPaymentDay().plusDays(period).isBefore(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))); //바궈야진
        log.warn("마진 = {}", noMargin);

        if(noMargin){
            scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));
            log.warn("스케쥴러 취소");
            log.warn("스케쥴러 다시시작");
            startSchedule(orderId, itemOrder);
        }
    }

    private void extendPeriod( Long orderId, ItemOrder itemOrder ) throws SchedulerException, InterruptedException{
        log.warn("배달기한 늘릴 때 기한 = {}", itemOrder.getPeriod());

        scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));

        JobKey jobkey = jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId));
        JobDetail payDay = jobDetail.buildJobDetail(jobkey, orderId, itemOrder);
        Trigger changeTrigger = trigger.changeTrigger(jobkey, orderId, itemOrder);

        log.warn("구매시간 = {}", itemOrder.getPaymentDay());

        Date date = scheduler.scheduleJob(payDay, changeTrigger);
        log.warn(" extend scheduler = {}", date);
    }

    public void delayDelivery( Long orderId, Integer delay ) throws SchedulerException{

        ItemOrder itemOrder = itemOrderService.delayDelivery(orderId, delay);
        //실행일을 옮겨야됨.
        scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));

        JobKey jobkey = jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId));
        JobDetail payDay = jobDetail.buildJobDetail(jobkey, orderId, itemOrder);
        Trigger changeTrigger = trigger.delayTrigger(jobkey, orderId, itemOrder);

        Date date = scheduler.scheduleJob(payDay, changeTrigger);
        log.warn(" extend scheduler = {}", date);

        log.warn("구독 일단 정지 = {}", itemOrder.getItem().getTitle());
//        connectUri(String.valueOf(itemOrder.getNextDelivery()));
    }

    public void cancelScheduler( Long orderId, Long itemOrderId) throws SchedulerException{
        ItemOrder itemOrder = getItemOrder(orderId, itemOrderId);
        scheduler.deleteJob(jobKey(String.valueOf(orderId) + itemOrder.getItemOrderId(), String.valueOf(orderId)));
        List<JobExecutionContext> currentlyExecutingJobs = scheduler.getCurrentlyExecutingJobs();
        log.warn("잡 = {}",currentlyExecutingJobs.size());
        orderService.cancelOrder(orderId);
        log.warn("구독 취소 = {}", itemOrder.getItem().getTitle());
    }

    public List<ItemOrder> getItemOrders( Long orderId ){
        Order order = orderService.findOrder(orderId);
        return order.getItemOrders();
    }
    public ItemOrder getItemOrder( Long orderId, Long itemOrderId ){
        Order order = orderService.findOrder(orderId);
        ItemOrder itemOrder = order.getItemOrders().get(0);
        log.warn("아이템오더 아이진 = {}", itemOrder.getItemOrderId());
        return itemOrder;
    }

}
