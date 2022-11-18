package server.team33.payment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class Controller {
    private final KakaoPayService kakaoPayService;

    @GetMapping("/orders/pay") //order정보 저장???
    public ResponseEntity payRequest( @RequestParam(name = "total_amount") int totalAmount ){
        ReadyResponse readyResponse = kakaoPayService.payReady(totalAmount);
        return new ResponseEntity<>(readyResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/orders/pay/approve")
    public ResponseEntity payApprove(@RequestParam("pg_token") String pgToken,@RequestParam("tid") String tid){

        ApproveResponse approveResponse = kakaoPayService.payApprove(tid, pgToken);
        // 5. payment 저장
        //	orderNo, payMathod, 주문명.
        // - 카카오 페이로 넘겨받은 결재정보값을 저장.
//        Payment payment = Payment.builder()
//                .paymentClassName(approveResponse.getItem_name())
//                .payMathod(approveResponse.getPayment_method_type())
//                .payCode(tid)
//                .build();
//
//        orderService.saveOrder(order,payment);
        return new ResponseEntity<>(approveResponse,HttpStatus.CREATED);
    }


}
