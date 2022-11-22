package server.team33.scheduler.service;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.order.entity.ItemOrder;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;

/**
 * plusday(3) = 30일
 * plusday(6) = 60일
 * plusday(9) = 90일
 * plusday(12) = 120일
 */
@Service
@Data
@Slf4j
public class SubscriptionService {
    @Async
    public void getPaymentDay( ItemOrder itemOrder ) throws IOException{

        MultiValueMap<String, String> queryParam = new LinkedMultiValueMap<>();

        ZonedDateTime paymentDay = ZonedDateTime.now();

        itemOrder.setPaymentDay(paymentDay);
        log.info("payment = {}", itemOrder.getPaymentDay());

        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));
        log.info("nextDelivery = {}", nextDelivery);

        itemOrder.setNextDelivery(ZonedDateTime.parse(nextDelivery));
        log.info("nextDelivery = {}", itemOrder.getNextDelivery());

        connectUri(queryParam, nextDelivery);
    }

    @Async
    public void delayPaymentDay( ItemOrder itemOrder ) throws IOException{

        MultiValueMap<String, String> queryParam = new LinkedMultiValueMap<>();

        String nextDelivery = String.valueOf(itemOrder.getNextDelivery());
        log.info("nextDelivery = {}", nextDelivery);

        connectUri(queryParam, nextDelivery);
    }

    @Async
    public void changePaymentDay( ItemOrder itemOrder ) throws IOException{

        boolean noMargin = itemOrder.getNextDelivery().minusDays(itemOrder.getPeriod()).isBefore(ZonedDateTime.now());

        if(noMargin) throw new BusinessLogicException(ExceptionCode.PERIOD_NOT_CHANGE);

        MultiValueMap<String, String> queryParam = new LinkedMultiValueMap<>();

        ZonedDateTime paymentDay = itemOrder.getPaymentDay();
        log.info("payment = {}", itemOrder.getPaymentDay());

        String nextDelivery = String.valueOf(paymentDay.plusDays(itemOrder.getPeriod()));
        log.info("nextDelivery = {}", nextDelivery);

        connectUri(queryParam, nextDelivery);
    }

    private void connectUri( MultiValueMap<String, String> queryParam, String nextDelivery ){
        String encodedNextDelivery = URLEncoder.encode(nextDelivery, StandardCharsets.UTF_8);
        log.info("encodedNextDelivery = {}", encodedNextDelivery);

        queryParam.add("nextDeliveryDay", encodedNextDelivery);
        log.info("query = {}", queryParam);

        URI uri = UriComponentsBuilder.newInstance().scheme("http").host("localhost").port(8080).path("/tests") // 호스트랑 포트는 나중에 변경해야한다.
                .queryParams(queryParam).build().toUri();

        RestTemplate restTemplate = new RestTemplate();
        String forObject = restTemplate.getForObject(uri, String.class);
        log.error("result = {}", forObject);
    }

}




