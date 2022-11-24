package server.team33.scheduler.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.order.entity.ItemOrder;
import server.team33.order.service.ItemOrderService;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class SchedulingService {
    private final ThreadPoolTaskScheduler scheduler;
    private final SubscriptionService service;
    private final ItemOrderService itemOrderService;
    private PeriodicTrigger trigger;
    private final ConcurrentMap<String, ScheduledFuture<?>> scheduledFutureMap = new ConcurrentHashMap<>();

    public void stopScheduler( Long orderId, Long itemOrderId ){

        ScheduledFuture<?> scheduledFuture = scheduledFutureMap.get(String.valueOf(orderId) + itemOrderId);
        scheduledFuture.cancel(true);
    }

    public void startScheduler( Long orderId, ItemOrder itemOrder ){

        trigger = new PeriodicTrigger(itemOrder.getPeriod(), TimeUnit.SECONDS);
        ScheduledFuture<?> schedule = this.scheduler.schedule(autoPay(itemOrder), trigger);
        scheduledFutureMap.put(String.valueOf(orderId) + itemOrder.getItemOrderId(), schedule);
    }

    public void changePeriod( Long orderId, ItemOrder itemOrder, Integer period ){

        log.error("perid = {}", itemOrder.getPeriod());

        makeScheduleNull(orderId, itemOrder);
        ScheduledFuture<?> scheduledFuture;

        trigger = new PeriodicTrigger(period, TimeUnit.SECONDS);
        scheduledFuture = this.scheduler.schedule(change(itemOrder, period), trigger);

        scheduledFutureMap.put(String.valueOf(orderId) + itemOrder.getItemOrderId(), scheduledFuture);
    }


    public void delayDelivery( Long orderId, ItemOrder itemOrder, String delay ){

        log.info("next delayDelivery = {}", itemOrder.getNextDelivery());

        makeScheduleNull(orderId, itemOrder);
        ScheduledFuture<?> scheduledFuture;

        trigger = new PeriodicTrigger(itemOrder.getPeriod(), TimeUnit.SECONDS);
        scheduledFuture = this.scheduler.schedule(delay(itemOrder, delay), trigger);

        scheduledFutureMap.put(String.valueOf(orderId) + itemOrder.getItemOrderId(), scheduledFuture);
    }

    private Runnable change( ItemOrder itemOrder, Integer period ){
        return () -> {
            try{
                service.changePaymentDay(itemOrder, period);
            } catch(IOException e){
                throw new RuntimeException(e);
            }
        };
    }

    private Runnable delay( ItemOrder itemOrder, String delay ){
        return () -> {
            try{
                service.delayPaymentDay(itemOrder, delay);
            } catch(IOException e){
                throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
            }
        };
    }

    public Runnable autoPay( ItemOrder itemOrder ){
        return () -> {
            try{
                service.getPaymentDay(itemOrder);
            } catch(IOException e){
                throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
            }
        };
    }

    private void makeScheduleNull( Long orderId, ItemOrder itemOrder ){

        ScheduledFuture<?> scheduledFuture = scheduledFutureMap.get(String.valueOf(orderId) + itemOrder.getItemOrderId());

        if(scheduledFuture != null) scheduledFuture.cancel(true);
        log.info("스케쥴 취소");

        scheduledFuture = null;
        log.info("schedule  {}", scheduledFuture);

    }
}
