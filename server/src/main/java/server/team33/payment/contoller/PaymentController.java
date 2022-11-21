package server.team33.payment.contoller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.order.service.OrderService;
import server.team33.payment.dto.KakaoPayApproveDto;
import server.team33.payment.dto.KakaoPayRequestDto;
import server.team33.payment.service.PayService;
import server.team33.user.redis.RedisConfig;
import server.team33.user.service.UserService;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@RestController
@Slf4j
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PayService payService;
    private  final OrderService orderService;
    private Long id;
    private final UserService userService;
    private final RedisConfig redis;

//    @PreAuthorize("isAuthenticated()")
    @GetMapping("/kakao-pay")
    public KakaoPayRequestDto payRequest( @RequestParam(name = "total_amount") int totalAmount, @RequestParam(name = "orderId") Long orderId, @RequestParam(name = "quantity") int quantity){

        id = userService.getUserId();
        KakaoPayRequestDto requestResponse = payService.kakaoPayRequest(totalAmount, quantity, orderId);

        redis.redisTemplate().opsForValue().set(String.valueOf(id), requestResponse.getTid(), 1000 * 60 * 15, TimeUnit.MILLISECONDS);
        return requestResponse;
    }


    @GetMapping("/kakao/success")
    public ResponseEntity payApprove( @RequestParam("pg_token") String pgToken ){
        String tid = (String) redis.redisTemplate().opsForValue().get(String.valueOf(id));
        if(tid == null) throw new BusinessLogicException(ExceptionCode.EXPIRED_TID);

        KakaoPayApproveDto kakaoPayApproveDto = payService.kakaoPayApprove(tid, pgToken);
        Long orderId = Long.valueOf(kakaoPayApproveDto.getPartner_order_id());
        log.info("orderId = {}", orderId);
        orderService.changeOrderStatus(orderId);

        return new ResponseEntity<>(kakaoPayApproveDto, HttpStatus.CREATED);
    }


    @GetMapping("/general/success")
    public ResponseEntity home( @RequestParam("paymentKey") String paymentKey, @RequestParam("amount") int amount, @RequestParam("orderId") String orderId ) throws IOException{
        String result = payService.generalPay(paymentKey, orderId, amount);
        String id = orderId.replace("abcdef", "");
        orderService.changeOrderStatus(Long.valueOf(id));
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

}
