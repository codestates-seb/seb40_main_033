package server.team33.payment.contoller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.order.entity.Order;
import server.team33.order.service.OrderService;
import server.team33.payment.dto.KakaoPayApproveDto;
import server.team33.payment.dto.KakaoPayRequestDto;
import server.team33.payment.service.PayService;
import server.team33.user.redis.RedisConfig;
import server.team33.user.service.UserService;

import java.io.IOException;
import java.net.URI;
import java.util.concurrent.TimeUnit;

@RestController
@Slf4j
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PayService payService;
    private final OrderService orderService;
    private Long userId;
    private final UserService userService;
    private final RedisConfig redis;

    //    @PreAuthorize("isAuthenticated()")
    @GetMapping("/kakao-pay")
    public KakaoPayRequestDto payRequest( @RequestParam(name = "total_amount") int totalAmount, @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "quantity") int quantity ){

        userId = userService.getUserId();
        KakaoPayRequestDto requestResponse = payService.kakaoPayRequest(totalAmount, quantity, orderId);

        redis.redisTemplate().opsForValue().set(String.valueOf(userId), requestResponse.getTid(), 1000 * 60 * 15, TimeUnit.MILLISECONDS);

        return requestResponse;
    }


    @GetMapping("/kakao/success")
    public ResponseEntity payApprove( @RequestParam("pg_token") String pgToken ){

        String tid = (String) redis.redisTemplate().opsForValue().get(String.valueOf(userId));
        if(tid == null) throw new BusinessLogicException(ExceptionCode.EXPIRED_TID);

        KakaoPayApproveDto kakaoPayApproveDto = payService.kakaoPayApprove(tid, pgToken);

        Long orderId = Long.valueOf(kakaoPayApproveDto.getPartner_order_id());
        log.info("orderId = {}", orderId);

        findSubscription(orderId);

        return new ResponseEntity<>(kakaoPayApproveDto, HttpStatus.CREATED);
    }


    @GetMapping("/general/success")
    public ResponseEntity home( @RequestParam("paymentKey") String paymentKey, @RequestParam("amount") int amount, @RequestParam("orderId") String orderId ) throws IOException{

        String result = payService.generalPay(paymentKey, orderId, amount);

        orderId = orderId.replace("abcdef", "");

        findSubscription(Long.valueOf(orderId));

        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @GetMapping("/cancel")//TODO 일반결제 카카오페이결제 실패시 url결정해야
    public ResponseEntity cancel(){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/fail")
    public ResponseEntity fail(){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void doScheduling( Long orderId ){

        log.info("scheduler orderId = {}", orderId);
        MultiValueMap<String, String> queryParam = new LinkedMultiValueMap<>();

        queryParam.add("orderId", String.valueOf(orderId));
        log.info("query = {}", queryParam);

        URI uri = UriComponentsBuilder.newInstance().scheme("http").host("localhost").port(8080).path("/schedule") // 호스트랑 포트는 나중에 변경해야한다.
                .queryParams(queryParam).build().toUri();
        log.info("uri = {}", uri);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(uri, String.class);
    }

    private void findSubscription( Long orderId ){
        Order order = orderService.findOrder(orderId);
        orderService.completeOrder(order);
        if(order.isSubscription()){
            log.info("구독 확인");
            doScheduling(orderId);
        }
    }

}
