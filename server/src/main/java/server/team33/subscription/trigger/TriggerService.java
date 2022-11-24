package server.team33.subscription.trigger;

import lombok.extern.slf4j.Slf4j;
import org.quartz.JobKey;
import org.quartz.Trigger;
import org.springframework.stereotype.Component;
import server.team33.order.entity.ItemOrder;

import java.util.Date;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

@Slf4j
@Component
public class TriggerService {
    public Trigger buildTrigger( JobKey jobKey, Long orderId, ItemOrder itemOrder ){

        return  newTrigger()
                 .forJob(jobKey)
                 .withIdentity("trigger" + orderId +itemOrder.getItemOrderId(), String.valueOf(orderId))
                 .withSchedule(simpleSchedule()
                                  .withIntervalInSeconds(itemOrder.getPeriod())
                                  .repeatForever()
            )
                 .startNow()
            .build();
    }

    public Trigger changeTrigger( JobKey jobKey, Long orderId, ItemOrder itemOrder ){
        log.warn("트리거안에서 주기 = {}", itemOrder.getPeriod());
        log.warn("구매일 = {}",itemOrder.getPaymentDay());

        return  newTrigger()
                 .forJob(jobKey)
                 .withIdentity("trigger" + orderId +itemOrder.getItemOrderId(), String.valueOf(orderId))
                 .withSchedule(simpleSchedule()
                                  .withIntervalInSeconds(itemOrder.getPeriod())
                                  .repeatForever()
            )
                 .startAt(Date.from(itemOrder.getPaymentDay().toInstant()))
                .build();
    }

    public Trigger delayTrigger( JobKey jobKey, Long orderId, ItemOrder itemOrder ){
        log.warn("트리거안에서 주기 = {}", itemOrder.getPeriod());
        log.warn("다음 주문일 = {}", itemOrder.getNextDelivery());

        return  newTrigger()
                 .forJob(jobKey)
                 .withIdentity("trigger" + orderId +itemOrder.getItemOrderId(), String.valueOf(orderId))
                 .withSchedule(simpleSchedule()
                                        .withIntervalInSeconds(itemOrder.getPeriod())
                                        .repeatForever()
            )
                .startAt(Date.from(itemOrder.getNextDelivery().toInstant())).build();
    }

}
