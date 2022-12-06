package server.team33.payment.service;

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
import server.team33.payment.dto.KakaoPayApproveDto;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubsPayService {
    private final OrderService orderService;

    private final String PARTNER_USER_ID = "pillivery";
    private Long order_id;

    public KakaoPayApproveDto kakaoSubsPayRequest( Integer totalAmount, Integer quantity, Long orderId, String sid ){

        Order order = orderService.findOrder(orderId);

        Integer itemQuantity = order.getTotalItems();
        String itemName = order.getItemOrders().get(0).getItem().getTitle();
        String item_name = get_item_name(itemQuantity, itemName);
        order_id = orderId;
        MultiValueMap<String, String> parameters;
        parameters = getRequestParams(totalAmount, quantity, item_name, order_id, sid);

        log.info("parameters request = {}", parameters);

        HttpEntity<MultiValueMap<String, String>> kakaoRequestEntity = new HttpEntity<>(parameters, getKakaoHeader());

        String url = "https://kapi.kakao.com/v1/payment/subscription";
        RestTemplate restTemplate = new RestTemplate();
        KakaoPayApproveDto approveResponse = restTemplate.postForObject(url, kakaoRequestEntity, KakaoPayApproveDto.class);

        log.warn("approveResponse = {}", approveResponse.getApproved_at());
        log.warn("approveResponse = {}", approveResponse.getAmount().getTotal());
        log.warn("approveResponse = {}", approveResponse.getQuantity());
        log.warn("approveResponse = {}", approveResponse.getItem_name());

        return approveResponse;
    }

    private MultiValueMap<String, String> getRequestParams( int totalAmount, int quantity, String item_name, Long order_Id, String sid ){ //TODO: 파라미터 추가
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("sid", sid);
        parameters.add("cid", "TCSUBSCRIP");
        parameters.add("partner_order_id", String.valueOf(order_Id));
        parameters.add("partner_user_id", PARTNER_USER_ID);
        parameters.add("item_name", item_name);
        parameters.add("quantity", String.valueOf(quantity));
        parameters.add("total_amount", String.valueOf(totalAmount));
        parameters.add("tax_free_amount", "0");

        return parameters;
    }


//    public BillingKeyDto.Response getBillingKey( String authKey, String customerKey ){
//        BillingKeyDto dto = BillingKeyDto.builder().authKey(authKey).customerKey(customerKey).build();
//
//        Gson gson = new Gson();
//        String requestDto = gson.toJson(dto);
//        HttpEntity<String> request = new HttpEntity<>(requestDto,getTossHeader());
//
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "https://api.tosspayments.com/v1/billing/authorizations/issue";
//        BillingKeyDto.Response response = restTemplate.postForObject(url, request, BillingKeyDto.Response.class);
//
//        return response;
//    }
    private String get_item_name( Integer itemQuantity, String itemName ){
        if(itemQuantity == 1) return itemName;
        return itemName + " 그 외 " + ( itemQuantity - 1 );
    }

    private HttpHeaders getKakaoHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "KakaoAK 15fe252b3ce1d6da44b790e005f40964");
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        return httpHeaders;
    }
//    private HttpHeaders getTossHeader(){
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.set("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==");
//        httpHeaders.set("Content-type", "application/json");
//        return httpHeaders;
//    }

//    public void subsApprove( long orderId ){
//
//        Order order = orderService.findOrder(orderId);
//        User user = order.getUser();
//
//        GeneralPayDto.Subscription dto = GeneralPayDto.Subscription.builder().customerEmail(user.getEmail()).orderName(order.getItemOrders().get(0).getItem().getTitle()).amount(order.getExpectPrice()).customerName(user.getRealName()).taxFreeAmount(0).orderId(orderId + "abcdef").customerKey(orderId + "a").build();
//
//        Gson gson = new Gson();
//        String requestDto = gson.toJson(dto);
//        HttpEntity<String> request = new HttpEntity<>(requestDto,getTossHeader());
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "https://api.tosspayments.com/v1/billing/"+ user.getBillingKey();
//        restTemplate.postForObject(url, request, String.class);
//    }
}
