package server.team33.payment.contoller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.payment.response.PaymentResult;
import server.team33.payment.response.requestResponse;
import server.team33.payment.service.KakaoPayService;
import server.team33.user.redis.RedisConfig;
import server.team33.user.service.UserService;

import java.util.concurrent.TimeUnit;

@RestController
@Slf4j
@RequiredArgsConstructor
public class PaymentController {
    private final KakaoPayService kakaoPayService;
    private Long id;
    private final UserService userService;
    private final RedisConfig redis;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("orders/payment")
    public requestResponse payRequest( @RequestParam(name = "total_amount") int totalAmount ){

        id = userService.getUserId();
        requestResponse requestResponse = kakaoPayService.payRequest(totalAmount);

        redis.redisTemplate().opsForValue().set(String.valueOf(id), requestResponse.getTid(), 1000*60*15 ,TimeUnit.MILLISECONDS);
        return requestResponse;
    }


    @GetMapping("/payment")
    public ResponseEntity payApprove( @RequestParam("pg_token") String pgToken ){
        String tid = (String) redis.redisTemplate().opsForValue().get(String.valueOf(id));
        if(tid == null) throw new BusinessLogicException(ExceptionCode.EXPIRED_TID);

        PaymentResult paymentResult = kakaoPayService.payApprove(tid, pgToken);
        log.info("결제완료");

        return new ResponseEntity<>(paymentResult, HttpStatus.CREATED);

        // 5. payment 저장
        //	orderno, paymathod, 주문명.
        // - 카카오 페이로 넘겨받은 결재정보값을 저장.
        //        Payment payment = Payment.builder()
        //                .paymentClassName(approveResponse.getItem_name())
        //                .payMathod(approveResponse.getPayment_method_type())
        //                .payCode(tid)
        //                .build();
        //
        //        orderService.saveOrder(order,payment);
    }

    @GetMapping("/payment/cancel")
    public ResponseEntity cancel(){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/payment/fail")
    public ResponseEntity fail(){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
