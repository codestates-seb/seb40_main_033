package server.team33.subscription.job;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.springframework.stereotype.Component;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.service.OrderService;

import static org.quartz.JobBuilder.newJob;

@Slf4j
@Component
@RequiredArgsConstructor
public class JobDetailService {
    private final OrderService orderService;

    public JobDetail buildJobDetail( JobKey jobKey, Long orderId, Long itemOrderId ){

        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("orderId", orderId);

        Order order = orderService.findOrder(orderId);
        ItemOrder itemOrder = order.getItemOrders().get((int) ( itemOrderId - 1 ));
        jobDataMap.put("itemOrder",itemOrder);

        return newJob(SubscriptionJob.class).withIdentity(jobKey).usingJobData(jobDataMap).build();
    }
}
