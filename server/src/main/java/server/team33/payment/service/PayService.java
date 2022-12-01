package server.team33.payment.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import server.team33.order.entity.Order;
import server.team33.order.service.OrderService;
import server.team33.payment.dto.GeneralPayDto;
import server.team33.payment.dto.KakaoPayApproveDto;
import server.team33.payment.dto.KakaoPayRequestDto;

@Service
@Slf4j
@RequiredArgsConstructor
public class PayService {

    private final OrderService orderService;
    private final String PARTNER_USER_ID = "pillivery";
    private final String KAKAO_APPROVE_URL = "https://kapi.kakao.com/v1/payment/approve";
    private Long order_id;

    public KakaoPayRequestDto kakaoPayRequest( int totalAmount, int quantity, Long orderId ){

        Order order = orderService.findOrder(orderId);

        Integer itemQuantity = order.getTotalItems();
        String itemName = order.getItemOrders().get(0).getItem().getTitle();
        String item_name = get_item_name(itemQuantity, itemName);
        order_id = orderId;

        MultiValueMap<String, String> parameters;
        parameters = getRequestParams(totalAmount, quantity, item_name, order_id);
        parameters = isSubscription(parameters, order);

        log.info("parameters = {}", parameters);

        HttpEntity<MultiValueMap<String, String>> kakaoRequestEntity = new HttpEntity<>(parameters, getKakaoHeader());

        String url = "https://kapi.kakao.com/v1/payment/ready";
        RestTemplate restTemplate = new RestTemplate();
        KakaoPayRequestDto requestResponse = restTemplate.postForObject(url, kakaoRequestEntity, KakaoPayRequestDto.class);
        log.info("결제 준비 응답객체 " + requestResponse);

        return requestResponse;
    }

    public KakaoPayApproveDto kakaoPayApprove( String tid, String pgToken ){
        MultiValueMap<String, String> parameters;

        parameters = getApproveParams(tid, pgToken, order_id);

        KakaoPayApproveDto kakaoPayApproveDto = getKakaoPayApproveDto(parameters);

        return kakaoPayApproveDto;
    }

    public KakaoPayApproveDto kakaoSubsPayApprove( String tid, String pgToken ){

        MultiValueMap<String, String> parameters;
        parameters = getSubsApproveParams(tid, pgToken, order_id);
        KakaoPayApproveDto kakaoPayApproveDto = getKakaoPayApproveDto(parameters);

        return kakaoPayApproveDto;
    }

    private KakaoPayApproveDto getKakaoPayApproveDto( MultiValueMap<String, String> parameters ){

        HttpEntity<MultiValueMap<String, String>> kakaoRequestEntity = new HttpEntity<>(parameters, getKakaoHeader());
        RestTemplate restTemplate = new RestTemplate();
        KakaoPayApproveDto kakaoPayApproveDto = restTemplate.postForObject(KAKAO_APPROVE_URL, kakaoRequestEntity, KakaoPayApproveDto.class);
        log.info("결제 승인 응답 객체" + kakaoPayApproveDto);
        return kakaoPayApproveDto;
    }

    public String generalPay( String paymentKey, String orderId, int amount ) throws JsonProcessingException{

        GeneralPayDto tossRequestDto = GeneralPayDto.builder().paymentKey(paymentKey).orderId(orderId).amount(amount).build();

        ObjectMapper objectMapper = new ObjectMapper();
        String value = objectMapper.writeValueAsString(tossRequestDto);

        HttpEntity<String> generalRequestEntity = new HttpEntity<>(value, getGeneralHeader());

        String url = "https://api.tosspayments.com/v1/payments/confirm";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(url, generalRequestEntity, String.class);
    }


    private MultiValueMap<String, String> getApproveParams( String tid, String pgToken, Long order_id ){ //TODO : 파라미터 추가

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("cid", "TC0ONETIME");
        parameters.add("tid", tid);
        parameters.add("partner_order_id", String.valueOf(order_id));
        parameters.add("partner_user_id", PARTNER_USER_ID);
        parameters.add("pg_token", pgToken);

        return parameters;
    }

    private MultiValueMap<String, String> getSubsApproveParams( String tid, String pgToken, Long order_id ){ //TODO : 파라미터 추가
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("cid", "TCSUBSCRIP");
        parameters.add("tid", tid);
        parameters.add("partner_order_id", String.valueOf(order_id));
        parameters.add("partner_user_id", PARTNER_USER_ID);
        parameters.add("pg_token", pgToken);

        return parameters;
    }

    private MultiValueMap<String, String> getRequestParams( int totalAmount, int quantity, String item_name, Long order_Id ){ //TODO: 파라미터 추가
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("partner_order_id", String.valueOf(order_Id));
        parameters.add("partner_user_id", PARTNER_USER_ID);
        parameters.add("item_name", item_name);
        parameters.add("quantity", String.valueOf(quantity));
        parameters.add("total_amount", String.valueOf(totalAmount));
        parameters.add("tax_free_amount", "0");
        parameters.add("cancel_url", "http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/cancel");
        parameters.add("fail_url", "http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/fail");

        return parameters;
    }

    private MultiValueMap<String, String> isSubscription( MultiValueMap<String, String> parameters, Order order ){
        if(order.isSubscription()){
            parameters.add("cid", "TCSUBSCRIP");
            parameters.add("approval_url", "http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/payments/kakao/subs/success");
            return parameters;
        }
        parameters.add("cid", "TC0ONETIME");
        parameters.add("approval_url", "http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/payments/kakao/success");
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

    private String get_item_name( Integer itemQuantity, String itemName ){
        if(itemQuantity == 1) return itemName;
        return itemName + " 그 외 " + ( itemQuantity - 1 );
    }
}
