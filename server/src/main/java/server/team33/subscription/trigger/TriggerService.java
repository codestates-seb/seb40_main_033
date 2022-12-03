package server.team33.subscription.trigger;

import lombok.extern.slf4j.Slf4j;
import org.quartz.JobKey;
import org.quartz.Trigger;
import org.springframework.stereotype.Component;
import server.team33.order.entity.ItemOrder;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

@Slf4j
@Component
public class TriggerService {
//TODO 메서드 3개가 다 똑같네... 나중에 하나로 통일
    public Trigger buildTrigger( JobKey jobKey, Long orderId, ItemOrder itemOrder ){

        return  newTrigger()
                 .forJob(jobKey)
                 .withSchedule(simpleSchedule()
                                  .withIntervalInMinutes(itemOrder.getPeriod())
                                  .repeatForever()
            )
                .startNow()
//                .startAt(Date.from(itemOrder.getNextDelivery().toInstant())) //TODO 정석
                .build();
    }

}
