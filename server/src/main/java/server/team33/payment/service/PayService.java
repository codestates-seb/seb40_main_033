package server.team33.payment.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import server.team33.payment.dto.KakaoPayApproveDto;
import server.team33.payment.dto.GeneralPayDto;
import server.team33.payment.dto.KakaoPayRequestDto;

@Service
@Slf4j
public class PayService {
    RestTemplate restTemplate = new RestTemplate();
    public KakaoPayRequestDto kakaoPayRequest( int totalAmount ){
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

        MultiValueMap<String, String> parameters = getRequestParams(totalAmount);
        log.info("parameters = {}", parameters);

        HttpEntity<MultiValueMap<String, String>> kakaoRequestEntity = new HttpEntity<>(parameters, getKakaoHeader());

        String url = "https://kapi.kakao.com/v1/payment/ready";
        KakaoPayRequestDto requestResponse = restTemplate.postForObject(url, kakaoRequestEntity, KakaoPayRequestDto.class);
        log.info("결제 준비 응답객체 " + requestResponse);

        return requestResponse;
    }


    public KakaoPayApproveDto kakaoPayApprove( String tid, String pgToken ){

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
        MultiValueMap<String, String> parameters = getApproveParams(tid, pgToken);

        HttpEntity<MultiValueMap<String, String>> kakaoRequestEntity = new HttpEntity<>(parameters, getKakaoHeader());
        String url = "https://kapi.kakao.com/v1/payment/approve";

        KakaoPayApproveDto kakaoPayApproveDto = restTemplate.postForObject(url, kakaoRequestEntity, KakaoPayApproveDto.class);
        log.info("결제 승인 응답 객체" + kakaoPayApproveDto);

        return kakaoPayApproveDto;
    }
    public String generalPay( String paymentKey, String orderId, int amount ) throws JsonProcessingException{
        String url = "https://api.tosspayments.com/v1/payments/confirm";
        GeneralPayDto tossRequestDto = GeneralPayDto.builder().paymentKey(paymentKey).orderId(orderId).amount(amount).build();

        ObjectMapper objectMapper = new ObjectMapper();
        String value = objectMapper.writeValueAsString(tossRequestDto);


        HttpEntity<String> generalRequestEntity = new HttpEntity<>(value, getGeneralHeader());
        String result = restTemplate.postForObject(url, generalRequestEntity, String.class);
        return result;
    }
    private MultiValueMap<String, String> getRequestParams( int totalAmount ){ //TODO: 파라미터 추가
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("partner_order_id", "주문 아이디"); //나중에 바꿔야함
        parameters.add("partner_user_id", "pillivery");
        parameters.add("item_name", "영양제");//나중에 바꿔야함
        parameters.add("quantity", "2");//나중에 바꿔야함.
        parameters.add("total_amount", String.valueOf(totalAmount));
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", "http://localhost:8080/payments/kakao/success");
        parameters.add("cancel_url", "http://localhost:8080/fail");
        parameters.add("fail_url", "http://localhost:8080/cancel");
        return parameters;
    }
    private MultiValueMap<String, String> getApproveParams( String tid, String pgToken ){ //TODO : 파라미터 추가
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("tid", tid);
        parameters.add("partner_order_id", "주문 아이디");
        parameters.add("partner_user_id", "pillivery");
        parameters.add("pg_token", pgToken);
        return parameters;
    }
    private HttpHeaders getKakaoHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "KakaoAK 15fe252b3ce1d6da44b790e005f40964");
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        return httpHeaders;
    }
    private HttpHeaders getGeneralHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");
        httpHeaders.set("Content-Type", "application/json");
        return httpHeaders;
    }
}
