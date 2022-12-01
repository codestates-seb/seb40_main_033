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
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

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

    private final UserService userService;

    public void startSchedule( Long orderId, ItemOrder itemOrder ) throws SchedulerException{
        User user = getUser(orderId);
        JobKey jobkey = jobKey(user.getUserId() + itemOrder.getItem().getTitle(), String.valueOf(user.getUserId()));
        JobDetail payDay = jobDetail.buildJobDetail(jobkey, orderId, itemOrder);
        Trigger lastTrigger = trigger.buildTrigger(jobkey, orderId, itemOrder);
        Date date = scheduler.scheduleJob(payDay, lastTrigger);
        log.warn("new scheduler = {}", date);
    }


    public ZonedDateTime  changePeriod( Long orderId, Integer period ) throws SchedulerException, InterruptedException{

        ItemOrder itemOrder = itemOrderService.setItemPeriod(orderId, period);
        log.info("changed period = {}", itemOrder.getPeriod());

        if(payDirectly(orderId, period, itemOrder))
            return itemOrder.getPaymentDay().plusDays(itemOrder.getPeriod());

        ZonedDateTime paymentDay = itemOrder.getPaymentDay();
        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));
        log.info("extend nextDelivery = {}", nextDelivery);

        ItemOrder updatedItemOrder = itemOrderService.setDeliveryInfo(orderId, paymentDay, nextDelivery);

        extendPeriod(orderId, updatedItemOrder);

        return paymentDay.plusDays(itemOrder.getPeriod());
    }

    private boolean payDirectly( Long orderId, Integer period, ItemOrder itemOrder ) throws SchedulerException{
        boolean noMargin = itemOrder.getPaymentDay().plusSeconds(period).isBefore(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))); //바궈야진
        log.info("margin = {}", noMargin);

        if(noMargin){
            log.info("directly pay");
            resetSchedule(orderId, itemOrder);
            return true;
        }
        return false;
    }

    private void deleteSchedule( Long orderId, ItemOrder itemOrder ) throws SchedulerException{
        log.info("delete schedule");
        User user = getUser(orderId);
        scheduler.deleteJob(jobKey(user.getUserId() + itemOrder.getItem().getTitle(), String.valueOf(user.getUserId())));
    }

    private void extendPeriod( Long orderId, ItemOrder itemOrder ) throws SchedulerException, InterruptedException{
        log.warn("extendPeriod = {}", itemOrder.getPeriod());
        resetSchedule(orderId, itemOrder);
    }


    public ZonedDateTime delayDelivery( Long orderId, Integer delay ) throws SchedulerException{
        log.info("dealyDelivery");
        ItemOrder itemOrder = itemOrderService.delayDelivery(orderId, delay);
        resetSchedule(orderId, itemOrder);
        return itemOrder.getNextDelivery();
    }

    public void cancelScheduler( Long orderId ) throws SchedulerException{
        log.info("cancelScheduler");
        ItemOrder itemOrder = getItemOrder(orderId);
        deleteSchedule(orderId,itemOrder);
        orderService.cancelOrder(orderId);
        log.warn("canceled item title = {}", itemOrder.getItem().getTitle());
    }
    private void resetSchedule( Long orderId, ItemOrder itemOrder ) throws SchedulerException{
        deleteSchedule(orderId, itemOrder);
        startSchedule(orderId, itemOrder);
    }

    public List<ItemOrder> getItemOrders( Long orderId ){
        Order order = orderService.findOrder(orderId);
        return order.getItemOrders();
    }

    public ItemOrder getItemOrder( Long orderId ){
        Order order = orderService.findOrder(orderId);
        ItemOrder itemOrder = order.getItemOrders().get(0);
        return itemOrder;
    }

    public User getUser( Long orderId ){
        Order order = orderService.findOrder(orderId);
        return order.getUser();
    }

}
