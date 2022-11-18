package server.team33.payment.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import server.team33.payment.response.PaymentResult;
import server.team33.payment.response.requestResponse;

@Service
@Slf4j
public class KakaoPayService {
    private MultiValueMap<String, String> parameters;
    private HttpEntity<MultiValueMap<String, String>> requestEntity;
    RestTemplate restTemplate = new RestTemplate();
    private String url;

    public requestResponse payRequest( int totalAmount ){
        // order_id를 구하는 과정이라고 생각하면 될듯
        //        User user =  (User)SessionUtils.getAttribute("LOGIN_USER");
        //        List<CartDto> carts = cartMapper.getCartByUserNo(user.getNo());
        //
        //        String[] cartNames = new String[carts.size()];
        //        for(CartDto cart: carts) {
        //            for(int i=0; i< carts.size(); i++) {
        //                cartNames[i] = cart.getClassTitle();
        //            }
        //        }
        //        String itemName = cartNames[0] + " 그외" + (carts.size()-1);
        //        log.info("강좌이름들:"+itemName);
        //        String order_id = user.getNo() + itemName;

        parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("partner_order_id", "주문 아이디");
        parameters.add("partner_user_id", "pillivery");
        parameters.add("item_name", "영양제");
        parameters.add("quantity", "2");
        parameters.add("total_amount", String.valueOf(totalAmount));
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", "http://localhost:8080/payment");
        parameters.add("cancel_url", "http://localhost:8080/fail");
        parameters.add("fail_url", "http://localhost:8080/cancel");
        log.info("parameters = {}", parameters);

        requestEntity = new HttpEntity<>(parameters, getHeader());
        log.warn("request = {}", requestEntity);
        log.warn("headers = {}", getHeader());
        url = "https://kapi.kakao.com/v1/payment/ready";
        requestResponse requestResponse = restTemplate.postForObject(url, requestEntity, requestResponse.class);

        log.info("결제 준비 응답객체 " + requestResponse);

        return requestResponse;
    }

    public PaymentResult payApprove( String tid, String pgToken ){

        //orderId
        //        User user =  (User)SessionUtils.getAttribute("LOGIN_USER");
        //        List<CartDto> carts = cartMapper.getCartByUserNo(user.getNo());
        //        // 주문명 만들기.
        //        String[] cartNames = new String[carts.size()];
        //        for(CartDto cart: carts) {
        //            for(int i=0; i< carts.size(); i++) {
        //                cartNames[i] = cart.getClassTitle();
        //            }
        //        }
        //        String itemName = cartNames[0] + " 그외" + (carts.size()-1);
        //
        //        String order_id = user.getNo() + itemName;
        parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("tid", tid);
        parameters.add("partner_order_id", "주문 아이디");
        parameters.add("partner_user_id", "pillivery");
        parameters.add("pg_token", pgToken);

        requestEntity = new HttpEntity<>(parameters, getHeader());
        url = "https://kapi.kakao.com/v1/payment/approve";

        PaymentResult paymentResult = restTemplate.postForObject(url, requestEntity, PaymentResult.class);
        log.info("결제 승인 응답 객체" + paymentResult);

        return paymentResult;
    }

    //        String url = "https://kapi.kakao.com/v1/payment/approve";
    //        ApproveResponse approveResponse = restTemplate.postForObject(url, requestEntity, ApproveResponse.class);
    //        log.info("결제승인 응답 객체 " + approveResponse);
    //        return

    private HttpHeaders getHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "KakaoAK 15fe252b3ce1d6da44b790e005f40964");
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        return httpHeaders;
    }


}
